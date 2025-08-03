import React from 'react';
import './CardItem.css';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ id, title, description, image, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="card-item" onClick={handleClick}>
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
