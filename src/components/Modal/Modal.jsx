import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ img, onToggleModal }) => {
  useEffect(() => {
    const onCloseModal = event => {
      if (event.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', onCloseModal);
    return () => window.removeEventListener('keydown', onCloseModal);
  }, [onToggleModal]);

  const onBackdropCloseModal = event => {
    if (event.target === event.currentTarget) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={onBackdropCloseModal}>
      <div className={style.Modal}>
        <img src={img} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};
