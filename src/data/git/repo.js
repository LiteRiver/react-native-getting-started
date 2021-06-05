import Client from './client';

const SEARCH_URL = 'https://api.github.com/search/repositories';

class Repo {
  static async getList(options = {}) {
    const opts = {
      sort: 'stars',
      order: 'desc',
      page: 1,
      per_page: 50,
      ...options,
    };

    return await Client.get(SEARCH_URL, {
      query: {
        q: Client.buildSearchQuery(opts),
        sort: opts.sort,
        order: opts.order,
        page: opts.page,
        per_page: opts.per_page,
      },
      cache: true,
    });
  }
}

export default Repo;
