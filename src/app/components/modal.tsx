import React from "react";
import * as styles from './modal.css';

interface Photo {
  src: { medium: string };
  photographer: string;
  alt: string;
}

interface Video {
  video_files: Array<{
    quality: string;
    link: string;
  }>;
  user: {
    name: string;
    url: string;
  };
  video_pictures: Array<{
    picture: string;
  }>;
}

type ModalProps = {
  type: 'photo' | 'video';
  data: Photo | Video | null;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ type, data, onClose }) => {
  
  if (!data) return null;
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        {type === 'photo' && (
          <>
            <img 
              src={(data as Photo).src.medium} 
              alt={(data as Photo).photographer} 
              className={styles.modalImage} 
            />
            <h2>{(data as Photo).photographer}</h2>
            <p>{(data as Photo).alt}</p>
          </>
        )}
        {type === 'video' && (
          <>
            <video
              src={(data as Video).video_files.find(vf => vf.quality === 'hd')?.link}
              controls
              className={styles.modalImage}
            />
            <h2>{(data as Video).user.name}</h2>
            <p>url: {(data as Video).user.url}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;