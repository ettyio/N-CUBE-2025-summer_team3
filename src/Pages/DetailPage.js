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

const createOrGetChatRoom = async (currentUserId, sellerId, postId) => {
  const chatQuery = query(
    collection(db, "chats"),
    where("participants", "array-contains", currentUserId),
    where("postId", "==", postId)
  );

  const snapshot = await getDocs(chatQuery);

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (data.participants.includes(sellerId)) {
      return docSnap.id;
    }
  }

  const now = Timestamp.now();

  const newChatDoc = await addDoc(collection(db, "chats"), {
    participants: [currentUserId, sellerId],
    createdAt: now,
    postId: postId
  });

  await Promise.all([
    setDoc(doc(db, "users", currentUserId, "chats", newChatDoc.id), {
      chatId: newChatDoc.id,
      participants: [currentUserId, sellerId],
      createdAt: now,
      postId: postId
    }),
    setDoc(doc(db, "users", sellerId, "chats", newChatDoc.id), {
      chatId: newChatDoc.id,
      participants: [currentUserId, sellerId],
      createdAt: now,
      postId: postId
    }),
  ]);

  return newChatDoc.id;
};

const DetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sellerName, setSellerName] = useState('알 수 없음');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() };
          setPost(postData);
          const sellerUid = postData.sellerId?.uid || postData.sellerId;
          if (sellerUid) {
            const sellerRef = doc(db, 'users', sellerUid);
            const sellerSnap = await getDoc(sellerRef);
            if (sellerSnap.exists()) {
              const sellerData = sellerSnap.data();
              setSellerName(sellerData.username || '이름 없음');
            }
          }
        }
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    };
    fetchPost();
  }, [id]);

  const handleReport = async ({ target, reason }) => {
    const currentUserId = auth.currentUser?.uid;
    const sellerId = post.sellerId?.uid || post.sellerId;

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
            {post.category} / {post.subject} / {post.professor} / {post.grade}
          </span>

          <div className="detail-price">
            <span className="detail-currency">₩</span>
            <span className="detail-amount">{post.price.toLocaleString()}</span>
          </div>

          <div className="detail-meta-row">
            <div className="detail-meta-block">
              <div className="meta-label">판매자</div>
              <div className="meta-value">{sellerName}</div>
            </div>
            <div className="detail-meta-block">
              <div className="meta-label">게시일</div>
              <div className="meta-value">
                {post.createdAt?.toDate().toLocaleDateString() || 'N/A'}
              </div>
            </div>
          </div>

          <div className="detail-buttons">
            <button className="chat-button" onClick={async () => {
              const currentUserId = auth.currentUser?.uid;
              const sellerId = post.sellerId?.uid || post.sellerId;
              const chatId = await createOrGetChatRoom(currentUserId, sellerId, post.id);
              navigate(`/chat/${post.id}`);
            }}>채팅</button>
            
            <button className="buy-button" onClick={() => navigate(`/pay/${post.id}`)}>구매</button>
            <button className="report-button" onClick={() => setShowModal(true)}>
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



