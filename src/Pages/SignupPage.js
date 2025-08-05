import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import '../PageStyles/SignupPage.css';

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
      await createUserWithEmailAndPassword(auth, email, password);
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
