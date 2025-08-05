
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../PageStyles/ChatPage.css'; 
  
const ChatPage = () => {
  const { chatId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fakeMessages = [
      { id: '1', text: '안녕하세요!', senderId: 'me' },
      { id: '2', text: '자료 보고 연락드렸어요.', senderId: 'other' },
      { id: '3', text: '네~ 필요하신 자료 있으신가요?', senderId: 'me' },
    ];
    setMessages(fakeMessages);
    scrollToBottom();
  }, []);

  const handleSend = () => {
    if (!newMsg.trim()) return;

    const newMessage = {
      id: String(Date.now()),
      text: newMsg,
      senderId: 'me'
    };

    setMessages((prev) => [...prev, newMessage]);
    setNewMsg('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="chat-room-container">
      <h2 className="chat-room-title">채팅방: {chatId}</h2>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.senderId === 'me' ? 'my-msg' : 'other-msg'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default ChatPage;
