// components/Sidebar/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">필터</h3>

      <div className="sidebar-section">
        <p className="sidebar-label">분류</p>
        <label><input type="checkbox" /> 기초</label>
        <label><input type="checkbox" /> 교양</label>
        <label><input type="checkbox" /> 전공</label>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">가격</p>
        <input type="range" min="0" max="10000" />
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">학년</p>
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
