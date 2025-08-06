// components/Header/Header.js
import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const Logo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogoClick = () => {
    if (user) {
      navigate('/main');  
    } else {
      navigate('/');      
    }
  };

  return (
    <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
      <img src="/logo.png" alt="Logo" />
    </div>
  );
};

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
  const { user, role, logout, loading } = useAuth();
  const navigate = useNavigate();
  console.log('user:', user);
  console.log('role:', role);
  console.log('loading:', loading);
  
  const handleMyPage = () => {
    if (loading) {
      alert('정보를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }

    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'user') {
      navigate('/mypage');
    } else {
      alert('권한 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <div className="auth-buttons">
      {user ? (
        <>
          {!loading ? (
            <button className="mypage-btn" onClick={handleMyPage}>
              {role === 'admin' ? '관리자페이지' : '마이페이지'}
            </button>
          ) : (
            <button className="mypage-btn" disabled>로딩 중...</button>
          )}
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
