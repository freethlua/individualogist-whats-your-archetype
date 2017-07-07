import { CSSTransitionGroup } from 'react-transition-group';
import hs from 'preact-hyperstyler';
import styles from './style.styl';

const h = hs(styles);

// export default child => child;
export default child => child && h(CSSTransitionGroup, {
  transitionName: styles,
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 500,
}, [child || '']);
