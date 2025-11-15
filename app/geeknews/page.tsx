import { getGeekNewsPodcasts, getTopGeekNewsItems } from '@/apis/server/geeknews';
import { PodcastGenerateForm } from '@/components/client/podcast';
import { NewsList, NewsListItem } from '@/components/server/news';
import { PodcastList, PodcastListItem } from '@/components/server/podcast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function GeekNewsPage() {
  const [newsRes, podcastsRes] = await Promise.all([getTopGeekNewsItems(), getGeekNewsPodcasts()]);
  const { data: news } = newsRes;
  const { data: podcasts } = podcastsRes;

  return (
    <main className="container mx-auto p-4 pt-18 space-y-4">
      <section className="w-full flex flex-col lg:flex-row gap-4">
        <Card className="w-full gap-0 py-0 ">
          <CardHeader className="pt-4 text-accent-foreground bg-accent border-b">
            <CardTitle>GeekNews Top Stories</CardTitle>
            <CardDescription>The top stories from GeekNews, update every 1 hour.</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <NewsList>
              {news.map((item, index) => (
                <NewsListItem key={index} index={index} item={item} type="geeknews" />
              ))}
            </NewsList>
          </CardContent>
        </Card>
        <aside className="lg:sticky lg:top-18 lg:max-w-md w-full h-fit">
          <Card className="w-full gap-0 pt-0">
            <CardHeader className="pt-4 text-accent-foreground bg-accent border-b">
              <CardTitle>GeekNews Podcasts</CardTitle>
              <CardDescription>The latest podcasts generated from GeekNews top stories.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <PodcastList>
                {podcasts.map((item, index) => (
                  <PodcastListItem key={index} index={index} item={item} />
                ))}
              </PodcastList>
            </CardContent>
            <CardFooter className="space-y-4 border-t">
              <CardDescription>Generate a podcast episode from the latest GeekNews top stories.</CardDescription>
              <PodcastGenerateForm type="geeknews" />
            </CardFooter>
          </Card>
        </aside>
      </section>
    </main>
  );
}
