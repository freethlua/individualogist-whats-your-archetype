import ReactCSSTransitionReplace from 'react-css-transition-replace';
import { CSSTransitionGroup } from 'react-transition-group';
import styles from './style.styl';
import hs from 'preact-hyperstyler';

const h = hs(styles);

export default child => h(CSSTransitionGroup, {
  transitionName: styles,
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 500,
}, [child]);
