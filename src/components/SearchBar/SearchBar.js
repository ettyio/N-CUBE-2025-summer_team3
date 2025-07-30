// components/SearchBar/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // 아이콘 사용

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-icon-button">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
