// src/components/Modal.tsx
import React from 'react';
import * as styles from './removeModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>이 스크랩을 정말로 삭제하시겠습니까?</p>
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            확인
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;