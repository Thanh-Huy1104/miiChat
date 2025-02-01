// src/components/ChatModal.jsx
import Modal from 'react-modal';

// Set the root element for accessibility (do this once in your app, usually in App.jsx)
Modal.setAppElement('#root');

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex flex-col h-96">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✖
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          <div className="self-start bg-gray-200 p-2 rounded-lg max-w-xs">
            Hello!
          </div>
          <div className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-xs">
            Hi there!
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center p-4 border-t">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring"
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
