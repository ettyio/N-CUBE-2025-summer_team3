import React, { useState } from 'react';
import './SideBar.css';
import Slider from './Slider';

const Sidebar = ({ priceRange, setPriceRange }) => {


    return (
        <div className="sidebar">
        <div className="filter-group">
            <h3 className="filter-title">태그</h3>
            <div className="tag-box">
                <div className="tag-item">태그1 <span className="remove">×</span></div>
                <div className="tag-item">태그2 <span className="remove">×</span></div>
                <div className="tag-item">태그3 <span className="remove">×</span></div>
            </div>
        </div>


        <div className="filter-group">
            <h3 className="filter-title">분류</h3>
            <div className="category-checkboxes">
                <label><input type="checkbox" /> 기초</label>
                <label><input type="checkbox" /> 교양</label>
                <label><input type="checkbox" /> 전공</label>
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
