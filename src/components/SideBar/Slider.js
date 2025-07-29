import React from 'react';
import ReactSlider from 'react-slider';
import './Slider.css';

const Slider = ({ min = 0, max = 10000, values, onChange }) => {
  return (
    <div className="price-slider-wrapper">
      <div className="price-label">
        ₩{values[0]} - ₩{values[1]}
      </div>
      <ReactSlider
        className="price-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={min}
        max={max}
        value={values}
        onChange={onChange}
        pearling
        minDistance={100}
      />
    </div>
  );
};

export default  Slider;
