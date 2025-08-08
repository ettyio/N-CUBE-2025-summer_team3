import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from '../components/ChatSideBar/ChatSideBar'; // ✅ 컴포넌트로 교체
import '../PageStyles/ChatHomePage.css'

function ChatHomePage() {
  const [, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const q = query(collection(db, 'chats'), where('participants', 'array-contains', currentUser.uid));
        const chatSnap = await getDocs(q);
        const chatList = await Promise.all(chatSnap.docs.map(async (chatDoc) => {
          const chat = chatDoc.data();
          const chatId = chatDoc.id;

          const otherUid = chat.participants.find(uid => uid !== currentUser.uid);

          let otherName = '알 수 없음';
          try {
            const userDoc = await getDoc(doc(db, 'users', otherUid));
            if (userDoc.exists()) {
              otherName = userDoc.data().name || '이름 없음';
            }
          } catch (err) {
            console.error('상대 이름 로딩 실패', err);
          }

          let postTitle = '제목 없음';
          if (chat.postId) {
            try {
              const postDoc = await getDoc(doc(db, 'posts', chat.postId));
              if (postDoc.exists()) {
                postTitle = postDoc.data().title;
              }
            } catch (err) {
              console.error('게시글 제목 로딩 실패', err);
            }
          }

          let lastMessage = '';
          try {
            const msgQuery = query(
              collection(db, 'chats', chatId, 'messages'),
              orderBy('createdAt', 'desc'),
              limit(1)
            );
            const msgSnap = await getDocs(msgQuery);
            if (!msgSnap.empty) {
              lastMessage = msgSnap.docs[0].data().text;
            }
          } catch (err) {
            console.error('마지막 메시지 로딩 실패', err);
          }

          return {
            id: chatId,
            otherName,
            postTitle,
            lastMessage
          };
        }));

        setChats(chatList);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chatpage-layout"> 
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />

      <div className="chat-room-container">
        <h2 className="chat-room-title">최근 채팅</h2>

        <ul className="chat-list chat-list-scrollable">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className="chat-item"
              onClick={() => navigate(`/chatroom/${chat.id}`)}
            >
              <p><strong>{chat.postTitle}</strong></p>
              <p>상대방: {chat.otherName}</p>
              <p className="last-message">💬 {chat.lastMessage || '메시지 없음'}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatHomePage;
