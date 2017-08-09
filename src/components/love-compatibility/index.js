import { Component } from 'preact';
import hs from 'preact-hyperstyler';
import styles from './style.styl';

const h = hs(styles);

export default class extends Component {
  componentDidMount() {}
  render() {
    return 'Love Compatibility!!!'
  }
};
