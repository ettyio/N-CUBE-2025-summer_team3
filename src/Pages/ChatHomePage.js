import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/ChatHomePage.css';

function ChatHomePage() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [chatDetails, setChatDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userChatsRef = collection(db, 'users', currentUser.uid, 'chats');
        const querySnapshot = await getDocs(userChatsRef);
        const chatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chatList);

        // 채팅방 정보 불러오기
        const detailsMap = {};

        await Promise.all(chatList.map(async (chat) => {
          const names = await Promise.all(
            (chat.participants || []).map(async (uid) => {
              try {
                const userDoc = await getDoc(doc(db, 'users', uid));
                if (userDoc.exists()) {
                  return userDoc.data().name || '이름 없음';
                } else {
                  return '알 수 없음';
                }
              } catch (error) {
                console.error('사용자 정보 가져오기 실패:', error);
                return '오류';
              }
            })
          );
          
          let title = '제목 없음';
          if (chat.postId) {
            try {
              const postDoc = await getDoc(doc(db, 'posts', chat.postId));
              if (postDoc.exists()) {
                title = postDoc.data().title || '제목 없음';
              }
            } catch(error) {
              title = '불러오기 오류';
            }
          }
          detailsMap[chat.id] = {names, title};
        }));
        setChatDetails(detailsMap);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-home-container">
      <h2>최근 채팅</h2>
      <ul className="chat-list">
        {chats.map(chat => (
          <li 
            key={chat.id} 
            className="chat-item"
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            {/* <p>채팅방 ID: {chat.id}</p> */}
            <p>포스트: {chatDetails[chat.id]?.title || '불러오는 중...'}</p>
            <p>참여자: {chatDetails[chat.id]?.names?.join(', ') || '불러오는 중...'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatHomePage;
