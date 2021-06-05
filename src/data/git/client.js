import qs from 'qs';
import MMKVStorage from 'react-native-mmkv-storage';

const QUALIFIERS = ['language', 'user', 'repo', 'in'];
const CACHE_HOURS = 4;
const MMKV = new MMKVStorage.Loader().initialize();

async function get(url, options = {}) {
  const {query} = options;
  let fullUrl = url;

  if (query) {
    fullUrl = `${fullUrl}?${qs.stringify(query, {format: 'RFC1738'})}`;
  }

  if (options.cache === true) {
    const cached = MMKV.getMap(fullUrl);
    if (isCacheValid(cached)) {
      return cached.entity;
    } else if (cached) {
      MMKV.removeItem(fullUrl);
    }
  }

  const res = await fetch(fullUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    throw new Error(`response error ${res.status}`);
  }

  const entity = await res.json();

  if (options.cache === true) {
    const now = new Date();
    now.setHours(now.getHours() + CACHE_HOURS);

    const cached = {
      entity: entity,
      expireAt: now.getTime(),
    };

    MMKV.setMap(fullUrl, cached);
  }

  return entity;
}

function buildSearchQuery(options = {}) {
  var opts = {...options};

  let q = `${buildKeywords(opts)} ${buildQualifiers(opts)}`.trim();
  if (q.length === 0) {
    q = 'language:';
  }
  return q;
}

function buildKeywords(options) {
  const {keywords} = options;

  if (keywords && Array.isArray(keywords)) {
    return keywords.map(keyword => keyword.trim()).join(' ');
  } else if (keywords) {
    return keywords.trim();
  } else {
    return '';
  }
}

function buildQualifiers(options) {
  let str = '';
  QUALIFIERS.forEach(qulifier => {
    if (options[qulifier]) {
      str += ` ${qulifier}:${options[qulifier]}`;
    }
  });

  return str.trim();
}

function isCacheValid(cached) {
  const now = new Date();
  if (cached) {
    const expiredAt = new Date(cached.expireAt);
    return (
      expiredAt.getUTCFullYear() === now.getUTCFullYear() &&
      expiredAt.getUTCMonth() === now.getUTCMonth() &&
      expiredAt.getUTCDate() === now.getUTCDate() &&
      expiredAt > now
    );
  } else {
    return false;
  }
}

export default {get, buildSearchQuery};
