import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Header from './components/Header/Header.js';
import LoginPage from './Pages/LoginPage';
import FirstPage from './Pages/FirstPage';
import AdminPage from './Pages/AdminPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<FirstPage user={user} />} />         {/* 첫화면 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 */}
        <Route path="/admin" element={<AdminPage />} />   {/* 관리자 */}
      </Routes>
    </Router>
  );
}

export default App;
