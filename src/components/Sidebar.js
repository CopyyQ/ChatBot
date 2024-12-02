import React, { useState, useEffect, useRef } from 'react';
import { FaHistory, FaArrowLeft, FaArrowRight } from 'react-icons/fa';  // Thêm icon cho thu gọn trái/phải
import '../styles/Sidebar.css';

function Sidebar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);  // Tình trạng thu gọn sidebar
  const [chatItems, setChatItems] = useState([]);  // Danh sách chat
  const [visibleCount, setVisibleCount] = useState(20);  // Số lượng mục hiển thị ban đầu
  const chatListRef = useRef(null);

  // Giả lập dữ liệu chat
  const allChatItems = Array.from({ length: 100 }, (_, index) => `Chat Item ${index + 1}: Lorem ipsum dolor sit amet.`);

  useEffect(() => {
    // Load dữ liệu chat khi component mount
    setChatItems(allChatItems.slice(0, visibleCount));
  }, [visibleCount]);

  // Hàm xử lý khi cuộn tới đáy để tải thêm chat
  const handleScroll = () => {
    if (chatListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        // Nếu đã cuộn tới đáy thì tải thêm
        setVisibleCount(prevCount => prevCount + 10);
      }
    }
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Phần Footer chứa lịch sử chat */}
      <div className="sidebar-footer">
        {/* Hiển thị icon khi thu nhỏ, văn bản khi mở rộng */}
        <div 
          className="toggle-history" 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <FaArrowRight className="toggle-icon" />  // Mũi tên khi thu gọn
          ) : (
            <FaArrowLeft className="toggle-icon" />  // Mũi tên khi mở rộng
          )}
          {!isSidebarCollapsed && <div className="history-text">Chat History</div>}  {/* Hiển thị tên nếu chưa thu gọn */}
        </div>
      </div>

      {/* Danh sách lịch sử chat với scroll */}
      <div 
        className={`chat-history-list ${isSidebarCollapsed ? 'collapsed' : ''}`} 
        ref={chatListRef} 
        onScroll={handleScroll}
      >
        {chatItems.map((item, index) => (
          <div key={index} className="chat-item">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
