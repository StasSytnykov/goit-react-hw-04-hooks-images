import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={style.ButtonThumb}>
      <button onClick={onLoadMore} className={style.Button} type="button">
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
