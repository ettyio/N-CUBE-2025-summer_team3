import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import '../PageStyles/SignupPage.css';

function generateRandomUsername() {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4자리 숫자
  const randomString = Math.random().toString(36).substring(2, 6); // 랜덤 문자열 (소문자, 숫자)
  return `user${randomNum}${randomString}`;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledEmail = location.state?.email || ''; // 전달받은 이메일

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
    }
  }, [prefilledEmail]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const randomUsername = generateRandomUsername();
      const username = randomUsername;

      await setDoc(doc(db, 'users', user.uid), {
        username: randomUsername,
        name: randomUsername,
        email: email,
        phone: '',
        profileImage: '/BlankProfilePicture.png',
        major1: '',
        major2: '',
        role: 'user',
        createdAt: new Date()
      });

      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>

      <div className="signup-container">
        <form onSubmit={handleSignup} className="signup-form">
          <h2>회원가입</h2>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">가입하기</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignupPage;
