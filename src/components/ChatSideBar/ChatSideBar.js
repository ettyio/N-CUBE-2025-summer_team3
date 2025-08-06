import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatSideBar.css'; 

const ChatSidebar = ({ chats, activeChatId, setActiveChatId }) => {
  const navigate = useNavigate();

  return (
    <aside className="chat-sidebar">
      <h3>채팅</h3>
      <ul className="chat-room-list">
        {chats.map(chat => (
          <li
            key={chat.id}
            className={`chat-room-item ${chat.id === activeChatId ? 'active' : ''}`}
            onClick={() => {
              setActiveChatId(chat.id);
              navigate(`/chatroom/${chat.id}`);
            }}
          >
            {chat.otherName}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
