// src/components/ChatModal.jsx
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useAuth } from "../context/authContext";
import { getMessages } from "../services/chat.service";
import { IHotspot } from "../services/hotspot.service";
import { sendMessages } from "../services/messages.service";

// Set the root element for accessibility (do this once in your app, usually in App.jsx)
Modal.setAppElement("#root");

import Avatar1 from "../assets/avatars/avatar1.png";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Avatar4 from "../assets/avatars/avatar4.png";
import Avatar5 from "../assets/avatars/avatar5.png";
import Avatar6 from "../assets/avatars/avatar6.png";
import Avatar7 from "../assets/avatars/avatar7.png";
import Avatar8 from "../assets/avatars/avatar8.png";
import Avatar9 from "../assets/avatars/avatar9.png";
import Avatar10 from "../assets/avatars/avatar10.png";
import Avatar11 from "../assets/avatars/avatar11.png";
import Avatar12 from "../assets/avatars/avatar12.png";
import Avatar13 from "../assets/avatars/avatar13.png";
import Avatar14 from "../assets/avatars/avatar14.png";
import Avatar15 from "../assets/avatars/avatar15.png";
import Avatar16 from "../assets/avatars/avatar16.png";
import Avatar17 from "../assets/avatars/avatar17.png";
import Avatar18 from "../assets/avatars/avatar18.png";
import Avatar19 from "../assets/avatars/avatar19.png";
import Avatar20 from "../assets/avatars/avatar20.png";
import Avatar21 from "../assets/avatars/avatar21.png";
import Avatar22 from "../assets/avatars/avatar22.png";
import Avatar23 from "../assets/avatars/avatar23.png";
import Avatar24 from "../assets/avatars/avatar24.png";
import Avatar25 from "../assets/avatars/avatar25.png";

const avatars = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar15,
  Avatar16,
  Avatar17,
  Avatar18,
  Avatar19,
  Avatar20,
  Avatar21,
  Avatar22,
  Avatar23,
  Avatar24,
  Avatar25,
];
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const fetchMessages = async () => {
      try {
        if (currentHotspot?.chatID) {
          console.log("Fetching messages...", currentHotspot.chatID);
          const incomingMessages = await getMessages(currentHotspot.chatID);
          console.log("Fetched messages:", incomingMessages.messages);
          if (
            messages &&
            incomingMessages &&
            messages.length !== incomingMessages.messages.length
          ) {
            if (messagesEndRef.current) {
              messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
            setMessages(incomingMessages.messages);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (isOpen) {
      fetchMessages();

      intervalId = setInterval(() => {
        console.log("Fetching messages...", messages);
        fetchMessages();
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Stopped fetching messages.");
      }
    };
  }, [currentHotspot, isOpen]);

  const handleSendMessage = async () => {
    if (user?.user?.userID && input.trim()) {
      const createMessageDTO = {
        chatID: currentHotspot.chatID,
        content: input,
        senderID: user.user.userID, // Ensured it's defined
      };

      console.log("Sending message:", createMessageDTO);
      await sendMessages(createMessageDTO);
      setInput("");

      // Scroll after sending
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      console.error("User ID is missing or input is empty!");
    }
  };

  const handleChatClose = () => {
    setMessages([]);
    onClose();
    setInput("");
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleChatClose}
      className="bg-white p-6 flex-1 rounded-2xl shadow-xl max-w-xl h-[80%] w-full mx-auto absolute z-50"
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    >
      <div className="flex-1 h-[100%] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">{currentHotspot.name}</h2>
          <button
            onClick={handleChatClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="flex-1 flex-col overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-gray-300">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.messageID} className="flex items-end">
                {/* If message is from the current user, show avatar on the right */}
                {message.senderID === user?.user.userID ? (
                  <>
                    <div className="bg-black text-white px-3 py-1.5 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow-md ml-auto">
                      {message.content}
                    </div>
                    <img
                      src={avatars[user?.user.profileImg]}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full ml-2"
                    />
                  </>
                ) : (
                  /* If message is from another user, show avatar on the left */
                  <>
                    <div className="bg-gray-200 px-3 py-1.5 rounded-2xl max-w-[75%] break-words whitespace-pre-wrap shadow-md mr-auto">
                      {message.content}
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 flex-row flex  py-2 bg-black text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Send
            <div className="ml-2">
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
