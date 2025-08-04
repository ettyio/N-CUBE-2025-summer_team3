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
            value="우리은행 123-12345678-99 (예금주: 이서정)"
            disabled
          />

          <input type="text" placeholder="0000원" />

          <p>입금 시 구매 의사를 표명할 입금자명을 적어주세요.</p>
          <input type="text" placeholder="입금자명 / 주문번호" />

          <div>
            <strong>취소 및 환불 정책 안내</strong>
            <div className="refund-policy">
              <ol>
                <li>입금 전 취소: 입금 전 결제는 언제든지 취소할 수 있습니다.</li>
                <li>환불 가능 조건: 자료 열람 전</li>
                <li>자료 열람 후 환불 불가</li>
                <li>문의 사항: supportgoji@gmail.com 으로 연락</li>
                <li>처리 시간: 영업일 기준 3일 이내 완료</li>
              </ol>
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