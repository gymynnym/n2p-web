import { CopyToClipboardButton } from '@/components/client/common';
import Link from 'next/link';

const NEWS_URL_PREFIX = {
  hackernews: 'https://news.ycombinator.com/item?id=',
  geeknews: 'https://news.hada.io/topic?id=',
};

interface NewsListItemProps {
  index: number;
  item: NewsItem;
  type: NewsType;
}

export default function NewsListItem({ index, item, type }: Readonly<NewsListItemProps>) {
  const newsURL = `${NEWS_URL_PREFIX[type]}${item.id}`;
  const url = createURL(item.url, newsURL);

  function createURL(url: string, newsURL: string): URL {
    try {
      return new URL(url);
    } catch {
      return new URL(newsURL);
    }
  }

  return (
    <div role="listitem" className="px-3 py-2 flex gap-2 border-b last:border-b-0">
      <span className="font-semibold text-sm text-muted-foreground">{index + 1}</span>
      <div className="flex flex-1 flex-col">
        <Link href={url.toString()} target="_blank" className="w-fit text-sm text-blue-600 hover:underline">
          {url.host}
        </Link>
        <Link href={newsURL} target="_blank" className="w-fit font-medium hover:underline">
          {item.title}
        </Link>
      </div>
      <CopyToClipboardButton url={newsURL} />
    </div>
  );
}
