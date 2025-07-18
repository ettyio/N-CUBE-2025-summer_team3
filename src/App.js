import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />         {/* 첫화면 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
