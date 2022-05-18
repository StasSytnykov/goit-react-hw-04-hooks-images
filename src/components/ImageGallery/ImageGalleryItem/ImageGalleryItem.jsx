import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ URL, onToggleModal, onClickImg }) => (
  <li onClick={onToggleModal} className={style.ImageGalleryItem}>
    <img
      onClick={onClickImg}
      className={style.ImageGalleryItemImage}
      src={URL}
      alt=""
    />
  </li>
);

ImageGalleryItem.propTypes = {
  URL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
};
