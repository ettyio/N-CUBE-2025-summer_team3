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

const dropdownOptions = {
  category: ['전공', '교양', '기초'],
  department: {
    전공: ['AI데이터융합전공',
      'AI융합전공(Software&AI)',
      'Business & AI 전공',
      'Finance & AI융합전공',
      'Global Business & Technology전공',
      'ICT&AI세부모듈',
      'TESOL영어학전공',
      '게임한류문화산업세부모듈',
      '광고.PR.브랜딩전공',
      '교육학',
      '국가리더전공(글로벌)',
      '국제금융학과',
      '그리스.불가리아학과',
      '글로벌e스포츠매니지먼트전공',
      '글로벌스포츠산업전공',
      '글로벌스포츠산업학부',
      '기후변화융합전공',
      '남아프리카어전공',
      '독일어통번역학과',
      '동아프리카어전공',
      '디지털콘텐츠학부',
      '러시아학과',
      '루마니아학과',
      '말레이·인도네시아어통번역학과',
      '문화콘텐츠학전공',
      '미국·영연방전략세부모듈',
      '아랍어통번역세부모듈',
      '아프리카학부',
      '언론·정보전공',
      '언어인지과학과',
      '영미권통상통번역전공',
      '영미문학·번역전공',
      '영어통번역세부모듈',
      '영어통번역학부',
      '영어통번역학전공',
      '우크라이나학과',
      '융합비즈니스세부모듈',
      '융합인재학부',
      '이탈리아·EU전략세부모듈',
      '이탈리아어통번역학과',
      '인도학과',
      '일본어통번역학과',
      '전자물리학과',
      '정보통신공학과',
      '정치외교학과',
      '중국어통번역세부모듈',
      '중국어통번역학과',
      '중동·이슬람전략세부모듈',
      '중앙아시아학과',
      '중화권전략세부모듈',
      '철학과',
      '체코·슬로바키아학과',
      '컴퓨터공학전공',
      '태국어통번역학과',
      '테크노미디어디자인세부모듈',
      '통계학과',
      '투어리즘 & 웰니스학부',
      '패션관광문화산업세부모듈',
      '폴란드학과',
      '프랑스학과',
      '한국학과',
      '행정학과',
      '헝가리학과',
      '화학과',
      '환경학과'],
    교양: ['마이크로디그리(영어)',
      '언어와문학',
      '문화와예술',
      '역사와철학',
      '과학과기술',
      '인간과사회',
      '인성교육',
      'HUFS CAREER',
      '미래시뮬레이션',
      '실용외국어(선택)',
      '외국인을 위한 한국학',
      '생활과스포츠',
      '군사학',
      '대학외국어',
      '미네르바인문',
      'RC영어',
      '소프트웨어기초',
      'COLLEGE ENGLISH'],
    기초: ['인문대학',
      '국가전략언어대학',
      '경상대학',
      '공과대학(공과계열)',
      'CULTURE&TECHNOLOGY융합대학',
      'AI융합대학',
      '폴란드학과',
      '루마니아학과',
      '체코·슬로바키아학과',
      '헝가리학과',
      '세르비아·크로아티아학과',
      '중앙아시아학과',
      '우크라이나학과',
      '한국학과',
      '이공계열']
  },
  subject: {
    'AI데이터융합전공':[빅데이터분석기초,
      인공지능프로그래밍,
      객체지향프로그래밍,
      딥러닝기초,
      빅데이터모델링,
      자연어처리기초,
      컴퓨터비전
    ],
    'AI융합전공(Software&AI)':[컴퓨터구조,
      기계학습,
      데이터베이스,
      소프트웨어공학,
      컴퓨터네크워크,
      빅데이터,
      정보보안
    ],
      'Business & AI 전공':[자료구조,
        AI마케팅,
        비즈니스딥러닝,
        비즈니스머신러닝이론및실습
      ],
      'Finance & AI융합전공':[고급인공지능수학,
        금융시계열분석,
        이산수학,
        중급파이썬프로그래밍,
        딥러닝머신러닝,
        투자론과최적화,
        컨벡스최적화
      ],
      'Global Business & Technology전공':[],
      'ICT&AI세부모듈':[],
      'TESOL영어학전공':[],
      '게임한류문화산업세부모듈':[],
      '광고.PR.브랜딩전공':[],
      '교육학':[],
      '국가리더전공(글로벌)':[],
      '국제금융학과':[],
      '그리스.불가리아학과':[],
      '글로벌e스포츠매니지먼트전공':[],
      '글로벌스포츠산업전공':[],
      '글로벌스포츠산업학부':[],
      '기후변화융합전공':[],
      '남아프리카어전공':[],
      '독일어통번역학과':[],
      '동아프리카어전공':[],
      '디지털콘텐츠학부':[],
      '러시아학과':[],
      '루마니아학과':[],
      '말레이·인도네시아어통번역학과':[],
      '문화콘텐츠학전공':[],
      '미국·영연방전략세부모듈':[],
      '아랍어통번역세부모듈':[],
      '아프리카학부':[],
      '언론·정보전공':[],
      '언어인지과학과':[],
      '영미권통상통번역전공':[],
      '영미문학·번역전공':[],
      '영어통번역세부모듈':[],
      '영어통번역학부':[],
      '영어통번역학전공':[],
      '우크라이나학과':[],
      '융합비즈니스세부모듈':[],
      '융합인재학부':[],
      '이탈리아·EU전략세부모듈':[],
      '이탈리아어통번역학과':[],
      '인도학과':[],
      '일본어통번역학과':[],
      '전자물리학과':[],
      '정보통신공학과':[],
      '정치외교학과':[],
      '중국어통번역세부모듈':[],
      '중국어통번역학과':[],
      '중동·이슬람전략세부모듈':[],
      '중앙아시아학과':[],
      '중화권전략세부모듈':[],
      '철학과':[],
      '체코·슬로바키아학과':[],
      '컴퓨터공학전공':[],
      '태국어통번역학과':[],
      '테크노미디어디자인세부모듈':[],
      '통계학과':[],
      '투어리즘 & 웰니스학부':[],
      '패션관광문화산업세부모듈':[],
      '폴란드학과':[],
      '프랑스학과':[],
      '한국학과':[],
      '행정학과':[],
      '헝가리학과':[],
      '화학과':[],
      '환경학과':[],
      '마이크로디그리(영어)':[],
      '언어와문학':[],
      '문화와예술':[],
      '역사와철학':[],
      '과학과기술':[],
      '인간과사회':[],
      '인성교육':[],
      'HUFS CAREER':[],
      '미래시뮬레이션':[],
      '실용외국어(선택)':[],
      '외국인을 위한 한국학':[],
      '생활과스포츠':[],
      '군사학':[],
      '대학외국어':[],
      '미네르바인문':[],
      'RC영어':[],
      '소프트웨어기초':[],
      'COLLEGE ENGLISH':[],
      '인문대학':[],
      '국가전략언어대학':[],
      '경상대학':[],
      '공과대학(공과계열)':[],
      'CULTURE&TECHNOLOGY융합대학':[],
      'AI융합대학':[],
      '폴란드학과':[],
      '루마니아학과':[],
      '체코·슬로바키아학과':[],
      '헝가리학과':[],
      '세르비아·크로아티아학과':[],
      '중앙아시아학과':[],
      '우크라이나학과':[],
      '한국학과':[],
      '이공계열':[]
  },
  professor: {
    자료구조: ['김성복'],
    운영체제: ['이철수'],
    열역학: ['박영희'],
    회로이론: ['김성복'],
    취업역량강화: ['HR담당교수'],
    AI개론: ['AI전문가']
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
