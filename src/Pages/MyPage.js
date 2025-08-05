import React, { useRef, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../PageStyles/MyPage.css';


function MyPage() {

  const navigate = useNavigate();

  const [name, setName] = useState('홍길동');// 나중에 회원가입 내용으로 변경
  const [isEditingName, setIsEditingName] = useState(false);

  const [phone, setPhone] = useState('010-1234-5678'); // 나중에 회원가입 내용으로 변경
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [password, setPassword] = useState('********'); // 나중에 회원가입 내용으로 변경
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [profileImage, setProfileImage] = useState('/BlankProfilePicture.png');
  const fileInputRef = useRef(null);

  const [major1, setMajor1] = useState('');
  const [major2, setMajor2] = useState('');

  const majorOptions = ['AI데이터융합전공',
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
      '환경학과']

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.name || '');
            setPhone(data.phone || '');
            if (!isEditingPassword) {
              setPassword('********');
            }
            setProfileImage(data.profileImage || '/BlankProfilePicture.png');
            setMajor1(data.major1 || '');
            setMajor2(data.major2 || '');
          }
        }
      });
      return () => unsubscribe();
    }, [isEditingPassword]);

  const saveUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);

      if (isEditingPassword && password !== '********') {
        try {
          await updatePassword(user, password);
          alert('비밀번호가 변경되었습니다.');
        }catch (error) {
          if (error.code === 'auth/requires-recent-login') {
            alert('보안을 위해 다시 로그인 후 시도하세요.');
            return;
          } else {
            alert('비밀번호 변경 중 오류 발생: '+error.message);
            return;
          }
        }
      }
      await updateDoc(userRef, {
        name,
        phone,
        profileImage,
        major1,
        major2
      });
      alert('정보가 저장되었습니다.');

      setIsEditingName(false);
      setIsEditingPhone(false);
      setIsEditingPassword(false);
    }
  };

  const handleKeyDown = (e, setEditState) => {
    if (e.key === 'Enter') {
      setEditState(false);
      saveUserData();
    }
  };

  const handleProfileEdit = () => {
    fileInputRef.current?.click();
  };

  const handleProfileDelete = () => {
  setProfileImage('/BlankProfilePicture.png');
};

  return (
    <div className="mypage-container">
      <aside className="mypage-sidebar">
        <ul className="menu-list">
        <h2>마이페이지</h2>
        <ul>
        <ul className="menu-group">
          <li className="active">내 정보 수정</li>
        </ul>
        <ul className="menu-group">
          <li>업로드한 자료</li>
          <li>구매한 자료</li>
        </ul>
        <ul className="menu-group">
          <li
            data-desc="Open recent chats"
            onClick={() => navigate('/chat/:chatId')}
            style={{ cursor: 'pointer' }}
          >
            채팅
          </li>
        </ul>
        </ul>
          <li className="withdraw">회원탈퇴</li>
        </ul>
      </aside>

      <main className="mypage-content">
        <div className="profile-section">
          <div className="profile">
              <img
                src={profileImage}
                alt="프로필"
                className="profile-image"
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setProfileImage(reader.result); // base64로 변환해 상태에 저장
                };
                reader.readAsDataURL(file);
                    }
                }}
                />

              <div className="profile-actions">
                <div className="profile__btns">
                  <button type="button" onClick={handleProfileEdit} aria-label="프로필 사진 수정">수정</button>
                  <button type="button" className="danger" onClick={handleProfileDelete} aria-label="프로필 사진 삭제">삭제</button>
                </div>
              </div>
            </div>

          <div className="info-group">
            <label>이름</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={!isEditingName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingName(false);
                    saveUserData();
                  }
                }}
            />
            {isEditingName ? (
              <button 
              onClick={() => {
                saveUserData();
                setIsEditingName(false);
              }}
            >
              저장
            </button>
            ) : (
              <button onClick={() => setIsEditingName(true)}>수정</button>
            )}
          </div>
          </div>
        <div className="info-group">
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            readOnly={!isEditingPassword}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, setIsEditingPassword)}
          />
          {isEditingPassword ? (
            <button 
              onClick={() => {
                saveUserData();
                setIsEditingPassword(false);
              }}
            >
              저장
            </button>
          ) : (
            <button onClick={() => setIsEditingPassword(true)}>수정</button>
          )}
        </div>

        <div className="info-group">
          <label>연락처</label>
          <input
            type="text"
            value={phone}
            readOnly={!isEditingPhone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, setIsEditingPhone)}
          />
          {isEditingPhone ? (
            <button 
              onClick={() => {
                saveUserData();
                setIsEditingPhone(false);
              }}
            >
              저장
            </button>
          ) : (
            <button onClick={() => setIsEditingPhone(true)}>수정</button>
          )}
        </div>

        <div className="info-group">
          <label>1전공</label>
          <select value={major1} onChange={(e) => setMajor1(e.target.value)}>
            <option value="">전공 선택</option>
            {majorOptions.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="info-group">
          <label>2전공</label>
          <select value={major2} onChange={(e) => setMajor2(e.target.value)}>
            <option value="">전공 선택</option>
            {majorOptions.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="info-group">
            <button className="save-button" onClick={saveUserData}>
              저장
            </button>
        </div>
      </main>
    </div>
  );
}
export default MyPage;