'use client';

import { getPodcastsText } from '@/apis/client/podcast';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { usePodcastPlayer } from '@/hooks/use-podcast-player';
import { useQuery } from '@tanstack/react-query';
import { PlayIcon, PauseIcon, XIcon, TextAlignStartIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function GlobalPodcastPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { filename, setFilename } = usePodcastPlayer();
  const { data: textData } = useQuery({
    queryKey: ['getPodcastsText', filename],
    queryFn: () => getPodcastsText(filename!),
    enabled: !!filename,
  });

  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleToggleButtonClick = useCallback(() => {
    if (paused) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [paused]);
  const handleCloseButtonClick = useCallback(() => {
    setFilename(undefined);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }, [setFilename]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.play();

    const handlePlay = () => setPaused(false);
    const handlePause = () => setPaused(true);
    const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
    const handleDurationChange = () => setDuration(audioRef.current?.duration || 0);

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('durationchange', handleDurationChange);

    return () => {
      audioRef.current?.removeEventListener('durationchange', handleDurationChange);
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current?.removeEventListener('pause', handlePause);
      audioRef.current?.removeEventListener('play', handlePlay);
    };
  }, [filename]);

  return (
    filename && (
      <Card className="fixed bottom-4 right-4 z-10 gap-2 p-2 rounded-lg">
        <h5 className="font-medium text-sm">
          <span className="font-semibold">Playing: </span>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_HOST}/podcasts/${filename}.mp3`}
            prefetch={false}
            target="_blank"
            className="w-fit text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {filename}.mp3
          </Link>
        </h5>
        <div className="text-sm flex gap-2">
          <span className="text-muted-foreground">
            {new Date(currentTime * 1000).toISOString().substring(14, 19)} /{' '}
            {isFinite(duration) ? new Date(duration * 1000).toISOString().substring(14, 19) : '∞:∞'}
          </span>
          <Slider
            className="flex-1"
            min={0}
            max={duration || 0}
            value={[currentTime]}
            onValueChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value[0];
              }
            }}
          />
        </div>
        <ButtonGroup className="mx-auto">
          <Button variant={'outline'} size={'icon'} onClick={handleToggleButtonClick}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </Button>
          <Button variant={'outline'} size={'icon'} onClick={handleCloseButtonClick}>
            <XIcon />
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} size={'icon'} disabled={!filename}>
                <TextAlignStartIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="p-3 max-w-md w-full max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-sans">{textData}</pre>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <audio ref={audioRef} src={`${process.env.NEXT_PUBLIC_API_HOST}/podcasts/${filename}.mp3`} hidden />
      </Card>
    )
  );
}
