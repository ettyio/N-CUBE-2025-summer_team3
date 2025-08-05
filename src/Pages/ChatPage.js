import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import '../PageStyles/ChatPage.css';

const ChatPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  const currentUser = auth.currentUser;

  // 🔄 실시간 메시지 불러오기
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!newMsg.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text: newMsg,
        senderId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNewMsg('');
    } catch (err) {
      console.error('메시지 전송 오류:', err);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="chat-room-container">
      <h2 className="chat-room-title">채팅방</h2>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.senderId === currentUser?.uid ? 'my-msg' : 'other-msg'}`}
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
