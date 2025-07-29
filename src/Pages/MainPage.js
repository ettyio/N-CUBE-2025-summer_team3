import React, { useState } from 'react';
import Header from '../components/Header/Header.js';
import SideBar from '../components/SideBar/SideBar.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
import CardItem from '../components/CardItem/CardItem';
import '../PageStyles/MainPage.css';

const mockPosts = [
  {
    title: "자료구조 정리본",
    description: "삽입, 삭제, 순회에 대한 정리",
    price: 2000,
    image: "/sample1.jpg"
  },
  {
    title: "자료구조 족보",
    description: "스택, 큐, 트리 포함",
    price: 3000,
    image: "/sample2.jpg"
  },
  {
    title: "대학영어(평화) 강의노트",
    description: "영단어 노트",
    price: 5000,
    image: "/sample3.jpg"
  },
  {
    title: "스페인어 기초",
    description: "이중전공자를 위한 기초 가이드",
    price: 8000,
    image: "/sample4.jpg"
  }
];

const MainPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    console.log("검색어:", text);
    // 🔜 나중에 카드 필터링 로직과 연결 가능
  };

  return (
    <div className="mainpage-layout">
      <SideBar />

      <div className="main-content">
        <div className="main-header">
          <SearchBar onSearch={handleSearch} />
          <div className="sort-buttons">
            <button className="active">기본</button>
            <button>인기순</button>
            <button>최신순</button>
          </div>
        </div>


        <div className="card-grid">
          {mockPosts.map((item, idx) => (
            <CardItem key={idx} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
