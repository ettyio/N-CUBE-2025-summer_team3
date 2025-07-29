import React from 'react';
import './CardItem.css';

const CardItem = ({ title, description, image, price }) => {
  return (
    <div className="card-item">
      <img src={image || '/image.png'} alt="자료 이미지" className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-price">₩ {price}</div>
      </div>
    </div>
  );
};

export default CardItem;
