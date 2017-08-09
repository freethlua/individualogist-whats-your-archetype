import { kebab } from 'case';

export default name => {
  try {
    return require('./' + kebab(name)).default;
  } catch (error) {}
  try {
    return require('./' + kebab(name) + '/index').default;
  } catch (error) {}
  try {
    return require('./' + name + '/index').default;
  } catch (error) {}
  return require('./' + name).default;
}
