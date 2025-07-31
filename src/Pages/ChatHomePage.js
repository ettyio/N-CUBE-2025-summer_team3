import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../PageStyles/ChatHomePage.css';

function ChatHomePage() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, 'chats'), where('members', 'array-contains', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const chatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chatList);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-home-container">
      <h2>최근 채팅</h2>
      <ul className="chat-list">
        {chats.map(chat => (
          <li key={chat.id} className="chat-item">
            <p>채팅방 ID: {chat.id}</p>
            <p>참여자: {chat.members.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHomePage;
