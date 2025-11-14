import { PodcastPlayButton } from '@/components/client/podcast';
import Link from 'next/link';

interface PodcastListItemProps {
  index: number;
  item: string;
}

export default function PodcastListItem({ index, item: filename }: Readonly<PodcastListItemProps>) {
  return (
    <div role="listitem" className="pl-3 flex items-center gap-2 border-b last:border-b-0">
      <span className="font-semibold text-sm text-muted-foreground">{index + 1}</span>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_HOST}/podcasts/${filename}.mp3`}
        prefetch={false}
        target="_blank"
        className="w-fit text-sm text-blue-600 hover:underline"
      >
        {filename}
      </Link>
      <PodcastPlayButton filename={filename} />
    </div>
  );
}
