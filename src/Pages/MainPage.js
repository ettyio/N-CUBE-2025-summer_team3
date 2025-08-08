import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom'; 

import SideBar from '../components/SideBar/SideBar.js';
import SearchBar from '../components/SearchBar/SearchBar.js';
import CardItem from '../components/CardItem/CardItem';
import '../PageStyles/MainPage.css';



const MainPage = () => {
  const location = useLocation(); 
  const [query, setQuery] = useState('');
  const [recentTags, setRecentTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedGrades, setSelectedGrades] = useState([]);


  const handleSearchLive = (text) => {
  setQuery(text);
  };  

  const handleSearchSubmit = (text) => {
  setRecentTags(prev => {
    const updated = [text, ...prev.filter(tag => tag !== text)];
    return updated.slice(0, 5);
  });
};

  const handleRemoveTag = (tagToRemove) => {
  setRecentTags(prev => prev.filter(tag => tag !== tagToRemove));
};

const handleClickTag = (tag) => {
  setQuery(tag); 
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

  useEffect(() => {
    if (location.pathname === '/basic') setSelectedCategories(['기초']);
    else if (location.pathname === '/liberal') setSelectedCategories(['교양']);
    else if (location.pathname === '/major') setSelectedCategories(['전공']);
    else setSelectedCategories([]);
  }, [location.pathname]);
    
 
  
    const displayedPosts = posts.filter((post) => {
    const matchQuery = post.title.toLowerCase().includes(query.toLowerCase());
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
    const matchPrice = post.price >= priceRange[0] && post.price <= priceRange[1];
    const matchGrade = selectedGrades.length === 0 || (post.grade && selectedGrades.includes(post.grade));
    return matchQuery && matchCategory && matchPrice &&matchGrade;
  });




  return (
    <div className="mainpage-layout">
     <SideBar
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        recentTags={recentTags}
        onRemoveTag={handleRemoveTag}
        onClickTag={handleClickTag}
        selectedGrades={selectedGrades}
        onGradeChange={setSelectedGrades}
      />

      <div className="main-content">
        <div className="main-header">
          <SearchBar 
          query={query}
          setQuery={setQuery}
          onSearchLive={handleSearchLive}
          onSearchSubmit={handleSearchSubmit} 
          />
        <div className="sort-buttons">
             <div className="sort-buttons">
            <button className="active">기본</button>
            <button>인기순</button>
            <button>최신순</button>
          </div>
       </div>
      </div> 


        <div className="card-grid">
          {displayedPosts.map((post) => (
            <CardItem 
            key={post.id}
            id={post.id}
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
