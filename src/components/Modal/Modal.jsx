import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }

  onCloseModal = event => {
    if (event.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  onBackdropCloseModal = event => {
    if (event.target === event.currentTarget) {
      this.props.onToggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={style.Overlay} onClick={this.onBackdropCloseModal}>
        <div className={style.Modal}>
          <img src={this.props.img} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
};
