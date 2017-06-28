import localforage from 'localforage';
import { version } from './package.json';

localforage.config({ name: 'v' + version });

export default {
  ready: localforage.getItem('data').then(data => {
    console.log(`Retrieved store data:`, data);
    return data;
  }),
  save: data => {
    delete data.class;
    console.log(`Saved store data:`, data);
    return localforage.setItem('data', data)
  },
  clear: () => localforage.setItem('data', {}),
}
