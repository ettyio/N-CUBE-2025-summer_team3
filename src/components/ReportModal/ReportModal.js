// src/components/ReportModal/ReportModal.js
import React, { useState } from 'react';
import './ReportModal.css';

const reportReasons = [
  '거래와 관계 없음',
  '부정확한 정보',
  '부적절한 언어 사용',
  '불쾌한 콘텐츠',
  '욕설/비방/혐오 표현',
  '기타'
];

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [target, setTarget] = useState('');
  const [reason, setReason] = useState('');
  const [etcReason, setEtcReason] = useState('');

  const handleSubmit = () => {
    if (!target || !reason) {
      alert('신고 대상과 사유를 모두 선택해주세요.');
      return;
    }

    const finalReason = reason === '기타' ? etcReason : reason;

    onSubmit({ target, reason: finalReason });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="report-modal">
        <h3>신고 사유를 선택해주세요.</h3>
        <label>대상</label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          <option value="">선택</option>
          <option value="게시물">게시물</option>
          <option value="작성자">작성자</option>
        </select>

        <label>사유</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)}>
          <option value="">선택</option>
          {reportReasons.map((r, idx) => (
            <option key={idx} value={r}>{r}</option>
          ))}
        </select>

        {reason === '기타' && (
          <textarea
            placeholder="사유를 입력해주세요"
            value={etcReason}
            onChange={(e) => setEtcReason(e.target.value)}
          />
        )}

        <div className="modal-buttons">
          <button onClick={onClose} className="cancel">취소</button>
          <button onClick={handleSubmit} className="confirm">확인</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
