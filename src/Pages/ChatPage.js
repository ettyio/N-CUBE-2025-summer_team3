import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, where, getDoc, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import '../PageStyles/ChatPage.css';
import ChatSidebar from '../components/ChatSideBar/ChatSideBar'; 
 

import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const currentUser = auth.currentUser;

  
// 1. 채팅 메시지 실시간 수신
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

// 2. 내 채팅 목록 불러오기 (사이드바용)
useEffect(() => {
  const fetchChats = async () => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'chats'), where('participants', 'array-contains', auth.currentUser.uid));
    const snapshot = await getDocs(q);

    const chatListData = await Promise.all(snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      const chatId = docSnap.id;

      const otherUid = data.participants.find(uid => uid !== auth.currentUser.uid);
      let otherName = '이름 없음';
      if (otherUid) {
        const userDoc = await getDoc(doc(db, 'users', otherUid));
        if (userDoc.exists()) {
          otherName = userDoc.data().name || '이름 없음';
        }
      }

      return {
        id: chatId,
        otherName,
      };
    }));

    setChatList(chatListData);
  };

  fetchChats();
}, []);

  

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
  <div className="chatpage-layout"> 
    <ChatSidebar
      chats={chatList}
      activeChatId={chatId}
      setActiveChatId={() => {}}
    />

    <div className="chat-room-container">
      <div className="chat-room-header">
        <button className="back-button" onClick={() => navigate('/chat')}>
          〈 채팅 목록으로
        </button>
        <h2 className="chat-room-title">채팅방</h2>
      </div>

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
  </div>
);
};

export default ChatPage;
