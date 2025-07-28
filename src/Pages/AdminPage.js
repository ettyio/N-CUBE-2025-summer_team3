import React, { useEffect, useState } from 'react';
import '../PageStyles/AdminPage.css';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const checkAdmin = async () => {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            const role = userDoc.data()?.role;
            if (role === 'admin') {
              setUser(currentUser);
            } else {
              navigate('/');
            }
          } catch (error) {
            console.error('Error checking admin role:', error);
            navigate('/');
          }
        };
        checkAdmin();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const features = [
    { title: '사용자', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
    { title: '자료', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
    { title: '신고', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
    { title: '기능 4', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
    { title: '기능 5', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
    { title: '기능 6', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lacinia porttitor arcu in vehicula.' },
  ];

  return (
    <div className="admin-page">
      <h1 className="admin-title">관리자</h1>

      <div className="admin-box">
        <div className="admin-greeting">
          <strong className='admin-greeting-bold'>안녕하세요, {user?.email || 'user'}님.</strong>
          <p className='admin-greeting-sub'>현재 관리자 계정으로 로그인되어 있습니다.</p>
        </div>

        <div className="admin-feature-grid">
          {features.map((feature, index) => (
            <div className="admin-feature" key={index}>
              <img src="/info.png" alt="info icon" className="feature-icon" />
              <div className="feature-text-wrapper">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
