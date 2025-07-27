import React, { useState } from 'react';
import '../PageStyles/CreatePage.css';

const CreatePage = () => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(5000);
  const [dropdowns, setDropdowns] = useState({
    category: '',
    department: '',
    subject: '',
    professor: '',
  });


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
  }
};

  const handleDropdownChange = (type, value) => {
    setDropdowns({ ...dropdowns, [type]: value });
  };

  return (
    <div className="create-container">
      <div className="create-box">
        <div className="create-box-right">
            <div className="image-upload">
                <img src={image || '/image.png'} alt="preview" className="preview-image" />

                <label htmlFor="file-input" className="edit-button">
                    <img src="/Icon%20Button.png" alt="사진 변경" />
                </label>

                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    />
            </div>
            <div className="dropdowns">
            {['category', 'department', 'subject', 'professor'].map((type) => (
              <select
                key={type}
                value={dropdowns[type]}
                onChange={(e) => handleDropdownChange(type, e.target.value)}
                className="dropdown"
              >
                <option value="">{`${type === 'category' ? '분류' : type === 'department' ? '학부' : type === 'subject' ? '과목' : '교수'} 선택`}</option>
                <option value="option1">옵션 1</option>
                <option value="option2">옵션 2</option>
              </select>
            ))}
            </div>
        </div>

        <div className="form-section">
          <div className="title-price">
            <input className="title-input" placeholder="글 제목" />
            <div className="price-box">
              <span className="won">₩</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="price-input"
              />
            </div>
          </div>
          <textarea className="description" placeholder="설명을 입력하세요." />

          <button className="submit-button">등록</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
