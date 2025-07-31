import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import Header from '../components/Header/Header.js';
import SideBar from '../components/SideBar/SideBar.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
import CardItem from '../components/CardItem/CardItem';
import '../PageStyles/MainPage.css';



const MainPage = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleSearch = (text) => {
  setQuery(text);
  console.log("검색어:", text);
};
  
  useEffect(() => {
      const fetchPosts = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'posts'));
         const data = snapshot.docs.map(doc => ({
           id: doc.id,
            ...doc.data()
         }));
         setPosts(data);
        } catch (error) {
         console.error("게시글 불러오기 오류:", error);
       }
      };
      fetchPosts();
    }, []);
 
  
  const filteredPosts = posts.filter(post => {
  const lowerTitle = post.title?.toLowerCase() || '';
  const lowerDesc = post.description?.toLowerCase() || '';
  const matchesSearch = lowerTitle.includes(query.toLowerCase()) || lowerDesc.includes(query.toLowerCase());
  const matchesPrice = post.price >= priceRange[0] && post.price <= priceRange[1];
  return matchesSearch && matchesPrice;
});


  return (
    <div className="mainpage-layout">
      <SideBar priceRange={priceRange} setPriceRange={setPriceRange} />


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
          {filteredPosts.map((post) => (
            <CardItem 
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            price={post.price}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
