import { serverAPI } from '@/apis/server/instance';

const getTopGeekNewsItems = async (limit: number = 20, page: number = 1) =>
  serverAPI
    .get('geeknews/top', {
      searchParams: { limit, page },
      next: { revalidate: 3600 }, // 1 hour
    })
    .json<ResponseModel<NewsItem[]>>();
const getGeekNewsPodcasts = async () => serverAPI.get('geeknews/podcasts').json<ResponseModel<string[]>>();

export { getTopGeekNewsItems, getGeekNewsPodcasts };
