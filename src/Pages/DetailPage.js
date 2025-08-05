import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  doc, setDoc, getDocs, collection,
  query, where, addDoc, getDoc, Timestamp
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import '../PageStyles/DetailPage.css';
import ReportModal from '../components/ReportModal/ReportModal';
import '../PageStyles/DetailPage.css';
import { useNavigate } from 'react-router-dom';

const createOrGetChatRoom = async (currentUserId, sellerId, postId) => {
  // chats 루트 컬렉션에서 기존 채팅방 조회
  const chatQuery = query(
    collection(db, "chats"),
    where("participants", "array-contains", currentUserId)
  );
  const snapshot = await getDocs(chatQuery);

  let existingChatId = null;
  snapshot.forEach((doc) => {
    const participants = doc.data().participants;
    if (participants.includes(currentUserId) && participants.includes(sellerId)) {
      existingChatId = doc.id;
    }
  });

  if (existingChatId) {
    return existingChatId;
  }

  const now = Timestamp.now();

  // 새 채팅방 생성
  const newChatDoc = await addDoc(collection(db, "chats"), {
    participants: [currentUserId, sellerId],
    createdAt: now,
    postId : postId
  });

  await setDoc(doc(db, "users", currentUserId, "chats", newChatDoc.id), {
    chatId: newChatDoc.id,
    participants: [currentUserId, sellerId],
    createdAt: now,
    postId: postId
  });
  await setDoc(doc(db, "users", sellerId, "chats", newChatDoc.id), {
    chatId: newChatDoc.id,
    participants: [currentUserId, sellerId],
    createdAt: now,
    postId: postId
  });

  return newChatDoc.id;
};

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }
    const currentUserId = currentUser.uid;
    const sellerId = post.sellerId;

    if (currentUserId === sellerId) {
      alert("본인과는 채팅할 수 없습니다.");
      return;
    }

    try {
      const chatId = await createOrGetChatRoom(currentUserId, sellerId, post.id);
      console.log("✅ 생성된 chatId:", chatId);
      navigate(`/chat/${chatId}`);
    } catch (err) {
      console.error("채팅방 이동 실패:", err);
      alert("채팅방 이동에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (!post) return <div>불러오는 중...</div>;

  return (
    <div className="detail-wrapper">
      <div className="detail-container">
        <div className="detail-left">
          <img src={post.image || '/image.png'} alt="자료 이미지" className="detail-image" />
          <div className="detail-description">{post.description}</div>
        </div>

        <div className="detail-right">
          <div className="detail-title-row">
            <h2 className="detail-title">{post.title}</h2>
            <button className={`heart-button ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
              <img src="/Button.png" alt="찜하기" className="heart-icon" />
            </button>
          </div>

          <span className="detail-category">
            {post.category} / {post.subject} / {post.professor}
          </span>

          <div className="detail-price">
            <span className="detail-currency">₩</span>
            <span className="detail-amount">{post.price.toLocaleString()}</span>
=======
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
      const chatId = await createOrGetChatRoom(currentUserId, sellerId, post.id);
      console.log("✅ 생성된 chatId:", chatId);
      navigate(`/chat/${chatId}`);
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
           <div className="meta-value">{post.sellerId?.name || '알 수 없음'}</div>
          </div>

          <div className="detail-meta-row">
            <div className="detail-meta-block">
              <div className="meta-label">판매자</div>
              <div className="meta-value">{post.sellerId.name}</div>
            </div>

            <div className="detail-meta-block">
              <div className="meta-label">게시일</div>
              <div className="meta-value">{post.createdAt?.toDate().toLocaleDateString()}</div>
            </div>
          </div>

          <div className="detail-buttons">
            <button className="chat-button" onClick={() => navigate(`/chat/${post.id}`)}>채팅</button>
            <button className="buy-button" onClick={() => navigate(`/pay/${post.id}`)}>구매</button>
            <button className="report-button">
              <img src="/report_icon.png" alt="신고" className="report-icon" />
            </button>
          </div>
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


