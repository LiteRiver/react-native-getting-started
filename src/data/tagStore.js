import MMKVStorage from 'react-native-mmkv-storage';
import defaultTags from './tags.json';
import helpers from '../helpers';

const MMKV = new MMKVStorage.Loader().initialize();
const KEY = 'tags';

const get = () => {
  const tags = MMKV.getArray(KEY);
  if (!tags) {
    return helpers.clone(defaultTags);
  }

  return tags;
};

const getChecked = () => {
  return get().filter(tag => tag.checked && tag.name !== 'ALL');
};

const set = tags => {
  return MMKV.setArray(KEY, tags);
};

export default {get, set, getChecked};
