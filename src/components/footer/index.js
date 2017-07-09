import hs from 'preact-hyperstyler';
import md from 'preact-markdown';
import fixSubdomain from '../../utils/fix-subdomain';
import styles from './style.styl';

const h = hs(styles);

export default h.div('.footer', [
  h.img({ src: require('../../assets/images/logos/large-text.png') }),
  md([
    `[Terms & Conditions](${fixSubdomain('/terms-and-conditions')})`,
    `[Privacy Policy](${fixSubdomain('/privacy-policy')})`,
    `[Contact us](${fixSubdomain('/contact-us')})`,
    `[Affiliates](${fixSubdomain('/jv-register')})`,
  ].join(' • ')),
  md(`Copyright ${new Date().getFullYear()} | Individualogist | All Rights Reserved`),
  md('ClickBank is the retailer of products on this site. CLICKBANK® is a registered trademark of Click Sales, Inc., a Delaware corporation located at 917 S. Lusk Street, Suite 200, Boise Idaho, 83706, USA and used by permission. ClickBank’s role as retailer does not constitute an endorsement, approval or review of these products or any claim, statement or opinion used in promotion of these products.'),
]);
