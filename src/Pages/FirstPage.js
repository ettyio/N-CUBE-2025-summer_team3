import React from 'react';
import Header from '../components/Header/Header.js';
import MainSection from '../components/MainSection/MainSection';
import Footer from '../components/Footer/Footer';
import FixedButton from '../components/FixedButton/FixedButton';

function FirstPage() {
  return (
    <div className="app-container">
      <MainSection/>
      <FixedButton/>
      <Footer/>
    </div>
  );
}

export default FirstPage;
