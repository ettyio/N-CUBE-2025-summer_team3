import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../PageStyles/DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    //테스트용 데이터
    if (!id) {
      setPost({
        title: '자료구조 족보',
        description: '스택, 큐, 트리 핵심 요약본입니다.',
        image: '/sample2.jpg',
        price: 5000,
        category: '전공',
        subject: '자료구조',
        professor: '신찬수',
        createdAt: { toDate: () => new Date() }
      });
      return;
    }

    // 나중에 실제 데이터 불러올 로직 (지금은안됨)
  }, [id]);

  if (!post) return <div>불려오는 중...</div>;

  return (
    <div className="detail-container">
      <div className="detail-left">
        <img
          src={post.image || '/image.png'}
          alt="자료 이미지"
          className="detail-image"
        />
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
            <img
              src="/report_icon.png"
              alt="신고"
              className="report-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
