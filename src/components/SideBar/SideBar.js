// components/Sidebar/Sidebar.js
import React from 'react';
import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="filter-group">
        <h3 className="filter-title">태그</h3>
        <div className="checkbox-group">
          <label><input type="checkbox" /> 태그1</label>
          <label><input type="checkbox" /> 태그2</label>
          <label><input type="checkbox" /> 태그3</label>
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">분류</h3>
        <label><input type="checkbox" /> 기초</label>
        <label><input type="checkbox" /> 교양</label>
        <label><input type="checkbox" /> 전공</label>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">가격</h3>
        <div className="price-range">
          <span className="price-label">₩0 - 100</span>
          <input type="range" min="0" max="100" />
        </div>
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
