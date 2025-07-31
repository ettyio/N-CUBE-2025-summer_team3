// components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // 아이콘 사용

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

 return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <button className="search-icon-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;

