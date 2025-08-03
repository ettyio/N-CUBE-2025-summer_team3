import React, { useState } from 'react';
import './SideBar.css';
import Slider from './Slider';

const Sidebar = ({ selectedCategories, onCategoryChange, priceRange, setPriceRange, recentTags, onRemoveTag, onClickTag}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onCategoryChange([value]);
    } else {
       onCategoryChange([]);
    }
  }
    return (
        <div className="sidebar">
        <div className="filter-group">
            <h3 className="filter-title">최근 검색</h3>
            <div className="tag-box">
                {recentTags.length > 0 ? (
                 recentTags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span onClick={() => onClickTag(tag)}>{tag}</span>
                        <span className="remove" onClick={() => onRemoveTag(tag)}>×</span>
                    </div>
                 ))
              ) : (
                <div className="tag-item">최근 검색어 없음</div>
              )}
            </div>          
        </div>

        <div className="filter-group">
            <h3 className="filter-title">분류</h3>
            <div className="category-checkboxes">
             {['기초', '교양', '전공'].map((cat) => (
             <label key={cat}>
               <input
                    type="checkbox"
                    value={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCheckboxChange}
                />
                {cat}
            </label>
             ))}
            </div>
        </div>

        <div className="filter-group">
            <h3 className="filter-title">가격</h3>
            <Slider values={priceRange} onChange={setPriceRange} />
        </div>

        <div className="filter-group">
            <h3 className="filter-title">학년</h3>
            <select>
            <option>전체</option>
            <option>1학년</option>
            <option>2학년</option>
            <option>3학년</option>
            <option>4학년</option>
            </select>
        </div>
        </div>
    );
};

export default Sidebar;
