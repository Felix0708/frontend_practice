import React from "react";
import styles from './Modal.module.css'

interface ModalProps {
  photo: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ photo, onClose }) => {
  if(!photo) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <img src={photo.src.large} alt={photo.photographer} className={styles.modalImage} />
        <h2>{photo.photographer}</h2>
        <p>{photo.alt}</p>
      </div>
    </div>
  );
};

export default Modal;