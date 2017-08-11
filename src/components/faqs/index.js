import hs from 'preact-hyperstyler';
import md from 'preact-markdown';
import faqsText from './faqs.txt';
import styles from './style.styl';

const h = hs(styles);

const faqsArray = faqsText
  .split(/[\s\n\r]+---[\s\n\r]+/g)
  .map(str => str.split(/\?[\s\n\r]+/));

const colors = {
  background: '662D91',
  questionBackground: 'E9EAEA',
};

export default props => h.div('.faqs', [
  h.header('The Answers To All Of Your Fears, Doubts, and Concerns'),
  ...faqsArray.map(([q, a]) =>
    h.details([
      h.summary([md(q)]),
      md(a),
    ]),
  )
]);
