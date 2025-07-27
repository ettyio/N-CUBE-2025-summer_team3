// components/Header/MainSection.jsx
import React from 'react';
import './MainSection.css';


const MainSection = () => {
  return (
    <section className="main-section">
      <h1 className="main-title">나좀구해죠</h1>
      <p className="subtitle">수업 필기 자료 공유 사이트</p>
      <div className="signup-box">
        <input type="email" placeholder="이메일을 입력하세요" />
        <button>회원가입</button>
      </div>
    </section>
  );
};

export default MainSection;