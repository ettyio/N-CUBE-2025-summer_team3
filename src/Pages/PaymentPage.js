import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../PageStyles/PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
        else console.log("존재하지 않는 게시물입니다.");
      } catch (e) {
        console.error("데이터 불러오기 실패:", e);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (!post) return <div>불러오는 중…</div>;

  const formatKRW = (n) => `${Number(n || 0).toLocaleString()}원`;

  return (
    <div className="payment-container">
      <h1 className="payment-title">결제</h1>

      <div className="payment-content">
        {/* 좌측: 상품 카드 */}
        <aside className="payment-product">
          <div className="product-image">
            <img
              src={post.image || "/image.png"}
              alt="자료 이미지"
              className="info-image"
            />
          </div>

          <div className="product-info">
            <h2>{post.title}</h2>
            <p> ₩{(Number(post.price) || 0).toLocaleString()}</p>
            <p>카테고리: {post.category}</p>
            <p>과목: {post.subject}</p>
            <p>교수: {post.professor}</p>
            <p className="product-desc">{post.description}</p>
          </div>
        </aside>

        <section className="payment-box">
        <div className="payment-panel">
          <p>아래 계좌번호로 입금 진행해주세요.</p>

          <input
            type="text"
            value="우리은행 1002-465-117975 (예금주: 이서정)"
            disabled
          />

          <input
            type="text"
            value={post ? formatKRW(post.price) : ''} 
            readOnly                                     // 복사 가능하도록
            aria-readonly="true"
          />

          <p>입금 시 아래 양식으로 입금자명을 적어주세요.</p>
          <input 
            type="text" 
            value="입금자명 / 주문번호" 
            disabled
          />

          <div>
            <strong>취소 및 환불 정책 안내</strong>
            <div className="refund-policy">
              <p className="section-title">1. 결제 후 취소</p>
              <p>
                입금 확인 전에는 언제든지 결제를 취소할 수 있습니다.<br />
                입금 후에는 자료 확인 여부에 따라 환불 가능 여부가 결정됩니다.
              </p>
              <p className="section-title">2. 환불 가능 조건</p>
              <p>
                <li>자료 열람 전: 전액 환불</li>
                <li>자료 열람 후: 환불 불가</li>
              </p>
              <p className="section-title">3. 환불 요청 방법</p>
              <p>
                <a href="mailto:support@plzSaveme.com">support@plzSaveme.com</a> 으로 연락 바랍니다.<br />
                이름, 입금자명, 입금일자, 환불 사유, 환불받으실 계좌번호를 함께 보내주세요.
              </p>
              <p className="section-title">4. 환불 처리 기간</p>
              <p>
                환불 요청 승인 후, 영업일 기준 3일 이내에 입금 계좌로 환불됩니다.
              </p>
            </div>
          </div>

          <label className="agreement">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            취소 및 환불 정책에 동의합니다. (미동의 시 결제 진행 불가)
          </label>

            <div className="pay-panel-title">결제 진행</div>
            <div className="pay-actions">
                <button className="pay-btn" disabled={!agreed}>결제 진행</button>
            </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default PaymentPage;