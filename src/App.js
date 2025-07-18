import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import LoginPage from './Pages/LoginPage';
import FirstPage from './Pages/FirstPage';


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<FirstPage />} />         {/* 첫화면 */}
        <Route path="/login" element={<LoginPage />} />   {/* 로그인 */}
      </Routes>
    </Router>
  );
}

export default App;
