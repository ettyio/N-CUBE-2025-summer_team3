import React, { useState } from 'react';
import '../PageStyles/CreatePage.css';
import dropdownOptions from '../data/dropdownOptions.js';

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


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      if (file.size > 1 * 1024 * 1024) { // 1MB 제한
        alert("이미지가 너무 큽니다. 더 작은 파일을 선택해주세요.");
        return;
      }
      setImage(base64Image);
    };
    reader.readAsDataURL(file);
  }
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
    console.log('등록 성공!');
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
    alert(
      '로그인 상태가 아니거나, 게시글 등록 중 오류가 발생했습니다.'
    );
  }
};

const handleDropdownChange = (type, value) => {
  setDropdowns((prev) => {
    const updated = { ...prev, [type]: value };

    if (type === 'category') {
      updated.department = '';
      updated.subject = '';
      updated.professor = '';
    } else if (type === 'department') {
      updated.subject = '';
      updated.professor = '';
    } else if (type === 'subject') {
      updated.professor = '';
    }

    return updated;
  });
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
              {/* Category */}
              <select
                value={dropdowns.category}
                onChange={(e) => handleDropdownChange('category', e.target.value)}
                className="dropdown"
              >
                <option value="">분류 선택</option>
                {dropdownOptions.category.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Department */}
              <select
                value={dropdowns.department}
                onChange={(e) => handleDropdownChange('department', e.target.value)}
                className="dropdown"
                disabled={!dropdowns.category}
              >
                <option value="">학부 선택</option>
                {(dropdownOptions.department[dropdowns.category] || []).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Subject */}
              <select
                value={dropdowns.subject}
                onChange={(e) => handleDropdownChange('subject', e.target.value)}
                className="dropdown"
                disabled={!dropdowns.department}
              >
                <option value="">과목 선택</option>
                {(dropdownOptions.subject[dropdowns.department] || []).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Professor */}
              <select
                value={dropdowns.professor}
                onChange={(e) => handleDropdownChange('professor', e.target.value)}
                className="dropdown"
                disabled={!dropdowns.subject}
              >
                <option value="">교수 선택</option>
                {(dropdownOptions.professor[dropdowns.subject] || []).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
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