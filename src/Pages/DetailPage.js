import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReportModal from '../components/ReportModal/ReportModal';
import '../PageStyles/DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

    // TODO: 실제 데이터 fetch 로직 추가 예정
  }, [id]);

  const handleReport = async ({ target, reason }) => {
    try {
      await fetch(`/materials/${id}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target, reason })
      });
      alert('신고가 완료되었습니다.');
    } catch (err) {
      console.error(err);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  if (!post) return <div>불러오는 중...</div>;

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
          <button className="report-button" onClick={() => setShowModal(true)}>
            <img
              src="/report_icon.png"
              alt="신고"
              className="report-icon"
            />
          </button>
        </div>
      </div>

      <ReportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleReport}
      />
    </div>
  );
};

export default DetailPage;


