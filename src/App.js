import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


import Header from './components/Header/Header.js';
import LoginPage from './Pages/LoginPage';
import FirstPage from './Pages/FirstPage';
import AdminPage from './Pages/AdminPage';
import CreatePage from './Pages/CreatePage';
import MainPage from './Pages/MainPage';
import MyPage from './Pages/MyPage';
import DetailPage from './Pages/DetailPage';
import SignupPage from './Pages/SignupPage.js';
import ChatHomePage from './Pages/ChatHomePage';
import PaymentPage from './Pages/PaymentPage';
import ChatPage from './Pages/ChatPage';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const fetchRole = async () => {
          try {
            const userRef = doc(db, 'users', currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setRole(userSnap.data().role);
            } else {
              setRole(null);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setRole(null);
          }
        };
        fetchRole();
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} role={role} />
      <Routes>
        <Route path="/" element={<FirstPage user={user} />} />         {/* 첫화면 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 */}
        <Route path="/signup" element={<SignupPage />} />    {/* 회원가입 */}
        {/* 관리자 */}
        <Route path="/admin" 
          element={
            user && role === 'admin' ? <AdminPage /> : <Navigate to="/login" />   
          }
        />
        <Route path="/main" element={<MainPage />} /> {/* 메인 */}
        <Route path="/new" element={<CreatePage />} />    {/* 자료업로드*/}
        <Route path="/mypage" element={<MyPage />} />           {/* 마이페이지 */}
        <Route path="/detail/:id" element={<DetailPage />} /> {/* 자료디테일 */}
        <Route path="/chat/" element={<ChatHomePage />} />    {/* 채팅 홈 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/basic" element={<MainPage />} />
        <Route path="/liberal" element={<MainPage />} />
        <Route path="/major" element={<MainPage />} />
        <Route path="/pay/:id" element={<PaymentPage />} />
        <Route path="/chatroom/:chatId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;

