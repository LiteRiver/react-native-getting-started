import Client from './client';

const SEARCH_URL = 'https://api.github.com/search/repositories';

class Repository {
  static async fetchTrending(options = {}) {
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
    });

    // return {
    //   totalCount: res.total_count,
    //   items: res.items.map(item => ({
    //     key: item.id.toString(),
    //     name: item.name,
    //     fullName: item.full_name,
    //     descr: item.description,
    //     stars: item.stargazers_count,
    //     watchers: item.watchers_count,
    //     ownerName: item.owner.login,
    //     avatarUrl: item.owner.avatar_url,
    //   })),
    // };
  }
}

export default Repository;
