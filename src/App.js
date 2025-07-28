import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


import Header from './components/Header/Header.js';
import LoginPage from './Pages/LoginPage';
import FirstPage from './Pages/FirstPage';
import AdminPage from './Pages/AdminPage';
import CreatePage from './Pages/CreatePage';

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
        <Route path="/admin" element={<AdminPage />} />   {/* 관리자 */}
        <Route path="/new" element={<CreatePage />} />    {/* 자료업로드*/}
      </Routes>
    </Router>
  );
}

export default App;

