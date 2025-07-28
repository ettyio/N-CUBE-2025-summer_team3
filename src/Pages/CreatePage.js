import React, { useState } from 'react';
import '../PageStyles/CreatePage.css';

import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CreatePage = () => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(5000);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dropdowns, setDropdowns] = useState({
    category: '',
    department: '',
    subject: '',
    professor: '',
  });


const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 문자열 저장
    };
    reader.readAsDataURL(file); // base64 인코딩
  }
};

const handleDropdownChange = (type, value) => {
  setDropdowns({ ...dropdowns, [type]: value });
};

const handleSubmit = async () => {
  if (!title || !description || !image) {
    alert('제목, 설명, 이미지가 필요합니다.');
    return;
  }

  try {
    await addDoc(collection(db, 'posts'), {
      title,
      description,
      price: Number(price),
      image, // base64
      ...dropdowns,
      createdAt: Timestamp.now(),
    });
    alert('게시글이 등록되었습니다!');
    // 초기화
    setTitle('');
    setDescription('');
    setPrice(5000);
    setImage('');
    setDropdowns({
      category: '',
      department: '',
      subject: '',
      professor: '',
    });
  } catch (error) {
    console.error('등록 실패:', error);
    alert('게시글 등록 중 오류가 발생했습니다.');
  }
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
            <input 
              className="title-input" 
              placeholder="글 제목" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
          <textarea 
            className="description" 
            placeholder="설명을 입력하세요." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="submit-button" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
