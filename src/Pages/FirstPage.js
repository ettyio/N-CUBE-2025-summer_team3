import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header.js';
import MainSection from '../components/MainSection/MainSection';
import Footer from '../components/Footer/Footer';
import FixedButton from '../components/FixedButton/FixedButton';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import '../PageStyles/FirstPage.css';

function FirstPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="page-layout">
      {/* <Header user={user} /> App.js에서 이미 렌더링해서 제거 */}
      <MainSection user={user} />
      <FixedButton user={user} />
      <Footer />
    </div>
  );
}

export default FirstPage;
