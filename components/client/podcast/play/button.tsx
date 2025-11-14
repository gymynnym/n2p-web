'use client';

import { Button } from '@/components/ui/button';
import { usePodcastPlayer } from '@/hooks/use-podcast-player';
import { PlayIcon } from 'lucide-react';

interface PodcastPlayButtonProps {
  filename: string;
}

export default function PodcastPlayButton({ filename }: Readonly<PodcastPlayButtonProps>) {
  const { setFilename } = usePodcastPlayer();

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="size-8 border-y-0 border-r-0 rounded-none"
      onClick={() => setFilename(filename)}
    >
      <PlayIcon className="size-3.5" />
    </Button>
  );
}
