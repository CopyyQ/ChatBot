import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';  // Thêm thư viện icon
import '../styles/Chatbot.css'; // Thêm file CSS cho Chatbot

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatbotId, setChatbotId] = useState(1); // Mặc định GPT-3
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm loading indicator
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Quản lý trạng thái dropdown

  const handleMessageSubmit = async () => {
    if (loading || !message.trim()) return;  // Ngừng gửi nếu đang loading hoặc tin nhắn trống
    setLoading(true); // Bật loading khi gửi tin nhắn

    try {
      const response = await axios.post('https://1aa0-34-74-245-61.ngrok-free.app/answer', {
        question: message,
      });

      setChatHistory(prevHistory => [
        ...prevHistory,
        { type: 'user', text: message },
        { type: 'bot', text: response.data.answer }
      ]);
      setMessage(''); // Reset input field

    } catch (error) {
      console.error("Error sending message:", error);  // In lỗi nếu có
    } finally {
      setLoading(false); // Tắt loading khi xong
    }
  };

  const resetChatHistory = () => {
    setChatHistory([]); // Reset lịch sử chat khi đổi model
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Chuyển trạng thái của dropdown
  };

  const handleOptionSelect = (id) => {
    setChatbotId(id);
    resetChatHistory();
    setDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="chat-container">
      <div className="chat-card">
        <div className="chat-header">
          <h3>Medical Chatbot</h3>
          <div className="model-selector">
            <div className="custom-select" onClick={toggleDropdown}>
              {chatbotId === 1 ? 'GPT-3' : 'Medical Bot'}
            </div>
            <div className={`select-options ${isDropdownOpen ? 'active' : ''}`}>
              <div 
                className="select-option"
                onClick={() => handleOptionSelect(1)}
              >
                GPT-3
              </div>
              <div 
                className="select-option"
                onClick={() => handleOptionSelect(2)}
              >
                Medical Bot
              </div>
            </div>
          </div>
        </div>

        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="input-section">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            className="form-control"
            placeholder="Type your question..."
          />
          <button
            onClick={handleMessageSubmit}
            className="btn btn-primary"
            disabled={loading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
