import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../PageStyles/DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('존재하지 않는 게시물입니다.');
        }
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div className="detail-container">
      <div className="detail-left">
        <img src={post.image || '/image.png'} alt="자료 이미지" className="detail-image" />
        <div className="detail-description">{post.description}</div>
      </div>

      <div className="detail-right">
        <h2 className="detail-title">{post.title}</h2>
        <span className="detail-category">
          {post.category} / {post.subject} / {post.professor}
        </span>
        <div className="detail-price">
          <span className="detail-currency">₩</span>
          <span className="detail-amount">{post.price.toLocaleString()}</span>
        </div>
        <div className="detail-meta-row">
          <div className="detail-meta-block">
            <div className="meta-label">판매자</div>
            <div className="meta-value">(예시) 익명</div>
          </div>
          <div className="detail-meta-block">
            <div className="meta-label">게시일</div>
            <div className="meta-value">
              {post.createdAt?.toDate().toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="detail-buttons">
          <button className="chat-button">채팅</button>
          <button className="buy-button">구매</button>
          <button className="report-button">
            <img src="/report_icon.png" alt="신고" className="report-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
