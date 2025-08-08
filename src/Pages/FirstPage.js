import React, { useEffect, useState } from 'react';
import MainSection from '../components/MainSection/MainSection';
import Footer from '../components/Footer/Footer';
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
      <Footer />
    </div>
  );
}

export default FirstPage;
