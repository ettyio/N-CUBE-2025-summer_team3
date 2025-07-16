import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.js';
import MainSection from './components/MainSection/MainSection';
import Footer from './components/Footer/Footer';
import FixedButton from './components/FixedButton/FixedButton';

function App() {
  return (
    <div className="app-container">
      <Header/>
      <MainSection/>
      <FixedButton/>
      <Footer/>
    </div>
  );
}

export default App;
