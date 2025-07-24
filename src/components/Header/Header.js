// components/Header/Header.js
import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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

const AuthButtons = () => {
  const { user, logout } = useAuth();

  return (
    <div className="auth-buttons">
      {user ? (
        <>
          <Link to="/mypage">
            <button className="mypage-btn">마이페이지</button>
          </Link>
          <button className="logout-btn" onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className="login-btn">로그인</button>
          </Link>
          <Link to="/signup">
            <button className="signup-btn">회원가입</button>
          </Link>
        </>
      )}
    </div>
  );
};

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
