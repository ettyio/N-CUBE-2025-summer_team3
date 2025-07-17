// components/Header/Header.js
import React from 'react';
import './Header.css';

const Logo = () => (
  <div className="logo">
    <img src="/logo.png" alt="Logo" />
  </div>
);

const NavMenu = () => (
  <nav className="nav-menu">
     <a href="/new" className="write-button">새글쓰기</a>
     <a href="/basic">기초</a>
     <a href="/liberal">교양</a>
     <a href="/major">전공</a>
  </nav>
);

const AuthButtons = () => (
  <div className="auth-buttons">
    <button className="login-btn">로그인</button>
    <button className="signup-btn">회원가입</button>
  </div>
);

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <div className="nav-auth-group">
        <NavMenu />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
