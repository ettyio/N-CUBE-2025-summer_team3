// components/Header/Header.js
import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img src="/logo.png" alt="Logo" />
    </Link>
  </div>
);

const NavMenu = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleNavClick = (path) => {
    if (user) {
      navigate(path);        
    } else {
      alert("로그인이 필요합니다.");
      navigate('/login');    
    }
  };
  
  return(
   <nav className="nav-menu">
     <Link to="/new" className="write-button">새글쓰기</Link>
     <button type="button" onClick={() => handleNavClick('/basic')}>기초</button>
     <button type="button" onClick={() => handleNavClick('/liberal')}>교양</button>
     <button type="button" onClick={() => handleNavClick('/major')}>전공</button>
   </nav>
 );
};

const AuthButtons = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleMyPage = () => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/mypage');
    }
  };

  return (
    <div className="auth-buttons">
      {user ? (
        <>
          <button className="mypage-btn" onClick={handleMyPage}>
            {role === 'admin' ? '관리자페이지' : '마이페이지'}
          </button>
          <button className="logout-btn" onClick={logout}>
            로그아웃
          </button>
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
