import { getHackerNewsPodcasts, getTopHackerNewsItems } from '@/apis/server/hackernews';
import { NewsList, NewsListItem } from '@/components/server/news';
import { PodcastList, PodcastListItem } from '@/components/server/podcast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HackerNewsPage() {
  const [newsRes, podcastsRes] = await Promise.all([getTopHackerNewsItems(), getHackerNewsPodcasts()]);
  const { data: news } = newsRes;
  const { data: podcasts } = podcastsRes;

  return (
    <main className="container mx-auto p-4 pt-18 space-y-4">
      <section className="w-full flex flex-col lg:flex-row gap-4">
        <Card className="w-full gap-0 py-0 ">
          <CardHeader className="pt-4 text-accent-foreground bg-accent border-b">
            <CardTitle>HackerNews Top Stories</CardTitle>
            <CardDescription>The top stories from HackerNews, update every 1 hour.</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <NewsList>
              {news.map((item, index) => (
                <NewsListItem key={index} index={index} item={item} type="hackernews" />
              ))}
            </NewsList>
          </CardContent>
        </Card>
        <aside className="lg:sticky lg:top-18 lg:max-w-md w-full h-fit">
          <Card className="w-full gap-0 py-0 ">
            <CardHeader className="pt-4 text-accent-foreground bg-accent border-b">
              <CardTitle>HackerNews Top Stories</CardTitle>
              <CardDescription>The top stories from HackerNews, update every 1 hour.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <PodcastList>
                {podcasts.map((item, index) => (
                  <PodcastListItem key={index} index={index} item={item} />
                ))}
              </PodcastList>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}
