import { serverAPI } from '@/apis/server/instance';

const getTopHackerNewsItems = async (limit: number = 20, page: number = 1) =>
  serverAPI
    .get('hackernews/top', {
      searchParams: { limit, page },
      next: { revalidate: 3600 }, // 1 hour
    })
    .json<ResponseModel<NewsItem[]>>();
const getHackerNewsPodcasts = async () => serverAPI.get('hackernews/podcasts').json<ResponseModel<string[]>>();

export { getTopHackerNewsItems, getHackerNewsPodcasts };
