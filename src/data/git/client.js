import qs from 'qs';

const QUALIFIERS = ['language', 'user', 'repo', 'in'];

async function get(url, options = {}) {
  const {query} = options;
  let fullUrl = url;

  if (query) {
    fullUrl = `${fullUrl}?${qs.stringify(query, {format: 'RFC1738'})}`;
  }

  console.log(':::::::::::::::::fetch data::::::::::::::');
  console.log(fullUrl);

  const res = await fetch(fullUrl, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    throw new Error(`response error ${res.status}`);
  }

  return await res.json();
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

export default {get, buildSearchQuery};
