// components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // 아이콘 사용

const SearchBar = ({ query, setQuery, onSearchLive, onSearchSubmit }) => {

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchLive(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(query); 
  };

 return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <button type= "submit" className="search-icon-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;

