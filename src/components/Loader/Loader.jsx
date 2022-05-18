import { ThreeCircles } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => (
  <div className={style.LoaderThumb}>
    <ThreeCircles
      color="#3f51b5"
      height={60}
      width={60}
      ariaLabel="three-circles-rotating"
    />
  </div>
);
