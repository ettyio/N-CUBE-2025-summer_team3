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
    'AI데이터융합전공':[
      /* 1학기 */
      "인공지능개론",
      "인공지능수학",
      "머신러닝",
      "통계모델링",
      "자료구조와알고리즘",
      "빅데이터시각화",
      "AI데이터융합세미나",
      "자연어처리의기초",
      "비정형데이터마이닝",
      "빅데이터마이닝",
      "컴퓨터비전",
      "AI데이터종합설계",
      "딥러닝고급",
      "최신기술콜로키움",
      /* 2학기*/
      "확률과통계",
      "인공지능윤리와철학",
      "객체지향프로그래밍",
      "텍스트마이닝기초",
      "빅데이터분석기초",
      "인공지능프로그래밍",
      "객체지향프로그래밍",
      "딥러닝기초",
      "빅데이터모델링",
      "자연어처리기초",
      "AI데이터기초설계",
      "거대언어모델의기초",
      "강화학습",
      "네크워크마이닝",
      "시계열데이터마이닝",
      "연구프로젝트및실습",
      "AI데이터융합논문",
      "로보틱스",
      "스타트업비지니스",
      "최신기술콜로지움2"
    ],
    'AI융합전공(Software&AI)':[
      "컴퓨터구조",
      "기계학습",
      "데이터베이스",
      "소프트웨어공학",
      "컴퓨터네크워크",
      "빅데이터",
      "정보보안"
    ],
      'Business & AI 전공':[
        "자료구조",
        "AI마케팅",
        "비즈니스딥러닝",
        "비즈니스머신러닝이론및실습"
      ],
      'Finance & AI융합전공':[
        "고급인공지능수학",
        "금융시계열분석",
        "이산수학",
        "중급파이썬프로그래밍",
        "딥러닝머신러닝",
        "투자론과최적화",
        "컨벡스최적화"
      ],
      'Global Business & Technology전공':[
        "국제경영학",
        "컴퓨터 프로그래밍",
        "관리회계",
        "교차문화커뮤니케이션",
        "소비자행동론",
        "조직행위론",
        "글로벌리더쉽원론",
        "모바일프로그래밍",
        "비즈니스소통",
        "빅데이터분석",
        "재무회계",
        "e마케팅",
        "마케팅전략실습",
        "빅데이터기반의사결정",
        "웹프레임워크",
        "인공지능",
        "졸업프로젝트실습(갭스톤디자인)"
      ],
      'ICT&AI세부모듈':[
        "Date Structure",
        "Probability & Statics",
        "Database",
        "Machine Learning",
        "Big Data"
      ],
      'TESOL영어학전공':[
        "TESOL읽기쓰기지도법",
        "영어학개론(2)",
        "TESOL현장실습",
        "세계영어",
        "심리언어학",
        "영어교수법",
        "영어어휘연구",
        "영어의미연구",
        "영어학습평가"
      ],
      '게임한류문화산업세부모듈':[
        "The World of Caltural contents",
        "Games & Storytelling",
        "Korean Cinema & TV Contents",
        "K-pop Contents Decoding Practice",
        "Psychological &Social Aspects of Games",
        "Business & Marketing in the Video Game Industry"
      ],
      '광고.PR.브랜딩전공':[
        "PR사례연구",
        "브랜드의이해",
        "광고캠페인전략론"
      ],
      '교육학':[
        "교육봉사활동",
        "교육심리",
        "인간과교육",
        "교육평가",
        "디지털교육",
        "외국어교과교육론",
        "외국어교재연구및지도법",
        "외국어논리및논술",
        "철학교재연구및지도법",
        "특수교육의이해",
        "학교폭력예방및학생의 이해",
        "교육행정및학교경영",
        "교직실무",
        "생활지도와상담",
        "과학교재연구및지도법",
        "수학교재연구및지도법"
      ],
      '국가리더전공(글로벌)':[
        "국가조직과법질서",
        "범죄와형벌II",
        "부동산과규범",
        "국제관계의규율",
        "범률중국어",
        "채권발생과실현",
        "행정과권리",
        "행정조직과절차",
        "헌법소송론",
        "지식재산의보호와활용"
      ],
      '국제금융학과':[
        "회계원리",
        "거시경제학",
        "국제경영론",
        "국제무역론",
        "조직행위론",
        "증권시장론",
        "투자론",
        "기업법",
        "무역실무",
        "원가관리회계",
        "파생금융상품론",
        "파이내스어낼리스틱",
        "경영금융실무특강",
        "금융리스크관리",
        "금융시계열분석",
        "기업분석및가치평가",
        "은행론"
      ],
      '그리스·불가리아학과':[
        "영어어휘의그리스어어원연구",
        "중동부유럽종교와민족이해",
        "초급그리스어",
        "초급그리스어회화(2)",
        "초급불가리아어(2)",
        "초급불가리아어텍스트이해(2)",
        "현대그리스와그리스학입문",
        "그리스와지중해세계유산",
        "불가리아와러시아",
        "중급그리스어문법과강독(2)",
        "중급그리스어작문과회화(2)",
        "중급불가리아어(2)",
        "중급불가리아어회화(2)",
        "중세그리스와비잔티온제국사연구",
        "그리스관광정보기획(종합설계)",
        "발칸다문화문명론",
        "불가리아영화와드라마",
        "비즈니스와사회생활을위한그리스어실습2",
        "인공지능을활용한고급그리스어통번역연습2",
        "중동부유럽이슈세미나",
        "테마별중급불가리아어(2)",
        "현대그리스사회와문화연구(종합설계)",
        "흑해지역지정학세미나",
        "FLEX불가리아어(2)",
        "그리영화와영상미디어연구(종합설게)",
        "글로벌지역데이터프로세싱실습(종합설계)",
        "불가리아무역실습(종합설계)(2)",
        "불가리아문화콘텐츠"
      ],
      '글로벌e스포츠매니지먼트전공':[
        "글로벌e스포츠미디어산업과중계권",
        '글로벌e스포츠거버넌스',
        '글로벌e스포츠이벤트개최및운영실습',
        "글로벌e스포츠게임기획및제작실습"
      ],
      '글로벌스포츠산업전공':[
        "스포츠경제학(캡스톤디자인)",
        "스포츠이벤트실습및스폰서십실무",
        "스포츠행정학개론",
        "스포츠PR커뮤니케이션실습(캡스톤디자인)",
        "스포츠경영경제분석",
        "스포츠경영사례분석(캡스톤디자인)"
      ],
      '글로벌스포츠산업학부':[
        
      ],
      '기후변화융합전공':[
        /* 1학기 */
        "기후경제학원론1",
        "기후변화개론1",
        "기후계량경제학",
        "에너지경제성평가론",
        "에너지시스템관리론",
        "지속가능ESG기술경영론",
        /* 2학기 */
        "기후변화개론2",
        "기후변화유발물질측정및분석",
        "에너지빅데이터분석",
        "ESG경영과리스크관리",
        "기후빅데이터프로그래밍및실습",
        "기후에너지정책론",
        "지속가능전력시스템최적화"
      ],
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
      '컴퓨터공학전공':[
        /* 1학기 */
        "논리회로",
        "데이터사이언스기초",
        "자료구조",
        "전기회로",
        "전자기학",
        "프로그래밍어론",
        "데이터통신",
        "디지털신호처리",
        "빅데이터처리",
        "설계패턴",
        "시스템프로그래밍",
        "컴퓨터구조",
        "컴퓨터그래픽스",
        "컴퓨터비전개론",
        "IoT 시스템",
        "게임프로그래밍",
        "고급문제해결기법및실습",
        "그래프마이닝",
        "데이터베이스설계",
        "멀티코어컴퓨팅",
        "캡스톤설계및실습",
        /* 2학기 */
        "선형대수",
        "컴퓨터시스템입문",
        "객체지향프로그래밍",
        "기계학습",
        "마이크로프로세서및실습",
        "알고리즘",
        "웹프로그래밍",
        "데이터베이스",
        "딥러닝",
        "소프트웨어공학",
        "운영체제",
        "자연어처리",
        "컴파일러구성론",
        "컴퓨터네트워크",
        "SW연구프로젝트및실습",
        "강화학습기초",
        "모바일프로그래밍",
        "인공지능특강",
        "캡스톤설계및실습",
        "컴퓨터보안"
      ],
      '태국어통번역학과':[],
      '테크노미디어디자인세부모듈':[],
      '통계학과':[],
      '투어리즘 & 웰니스학부':[],
      '패션관광문화산업세부모듈':[],
      '프랑스학과':[],
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
      '세르비아·크로아티아학과':[],
      '한국학과':[],
      '이공계열':[]
  },
  professor: {
    자료구조: ['신찬수'],
    운영체제: ['이철수'],
    열역학: ['박영희'],
    선형대수: ['김성복'],
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