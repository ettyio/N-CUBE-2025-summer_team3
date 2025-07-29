import React, { useState } from 'react';
import Header from '../components/Header/Header.js';
import SideBar from '../components/SideBar/SideBar.js';
import '../PageStyles/MainPage.css';

const MainPage = () => {
  return (
    <div className="mainpage-layout">
      <SideBar />
    </div>
  );
};

export default MainPage;