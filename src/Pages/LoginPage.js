import React, { useState } from 'react';
import '../PageStyles/LoginPage.css';
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // 상태 변수와 setter 선언
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  // 로그인 폼 제출 시 호출될 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    setErrorMsg('');

    try {
      await signInWithEmailAndPassword(auth, id, pw);
      console.log('로그인 성공!');
      navigate('/');
      // 로그인 성공 시 추가 동작
    } catch (error) {
      console.error(error);
      setErrorMsg("로그인에 실패했습니다: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="아이디 (이메일)"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};

export default LoginPage;
