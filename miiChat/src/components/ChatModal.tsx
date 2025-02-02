// src/components/ChatModal.jsx
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getMessages } from "../services/chat.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { sendMessages } from "../services/messages.service";
import { useAuth } from "../context/authContext";
import { IHotspot } from "../services/hotspot.service";

// Set the root element for accessibility (do this once in your app, usually in App.jsx)
Modal.setAppElement("#root");

export interface IMessage {
  messageID: string;
  chatID: string;
  content: string;
  senderID: string;
  createdAt: Date;
}

const ChatModal = ({
  isOpen,
  onClose,
  currentHotspot,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentHotspot: IHotspot;
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const fetchMessages = async () => {
      try {
        if (currentHotspot?.chatID) {
          console.log("Fetching messages...", currentHotspot.chatID);
          const messages = await getMessages(currentHotspot.chatID);
          console.log("Fetched messages:", messages.messages);
          setMessages(messages.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (isOpen) {
      fetchMessages(); // Fetch immediately when modal opens

      intervalId = setInterval(() => {
        console.log("Fetching messages...", messages);
        fetchMessages();
      }, 5000); // Fetch every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped fetching messages.");
      }
    };
  }, [currentHotspot, isOpen]);

  const handleSendMessage = async () => {
    if (user) {
      const createMessageDTO = {
        chatID: currentHotspot.chatID,
        content: input,
        senderID: user.user.userID,
      };
      console.log("Sending message...", createMessageDTO);
      await sendMessages(createMessageDTO);
      setInput("");
    }
  };

  const handleChatClose = () => {
    setMessages([]);
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleChatClose}
      className="bg-white p-6 flex-1 rounded-2xl shadow-xl max-w-xl h-[70%] w-full mx-auto absolute z-50"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div className="flex-1 h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Chat</h2>
          <button
            onClick={handleChatClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white flex flex-col">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.messageID}
                className={`${
                  message.senderID === user?.user.userID
                    ? "ml-auto bg-blue-500 text-white"  // Right-aligned for sender
                    : "mr-auto bg-gray-200"  // Left-aligned for receiver
                } px-3 py-1.5 rounded-2xl  max-w-[75%]`}
              >
                {message.content}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex items-center p-4 border-t">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
