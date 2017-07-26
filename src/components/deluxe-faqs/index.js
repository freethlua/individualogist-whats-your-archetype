import hs from 'preact-hyperstyler';
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

export default props => h.div('.faqs', faqsArray.map(([q, a]) =>
  h.details({ open: true }, [
    h.summary(q),
    h.p(a),
  ]),
));
