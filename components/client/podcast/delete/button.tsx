'use client';

import { deletePodcast } from '@/apis/client/podcast';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface PodcastDeleteButtonProps {
  filename: string;
}

export default function PodcastDeleteButton({ filename }: Readonly<PodcastDeleteButtonProps>) {
  const router = useRouter();

  function handleClickButton() {
    deletePodcast(filename)
      .then(() => toast.success('Podcast record deleted successfully'))
      .catch(() => toast.error('Failed to delete podcast record'))
      .finally(router.refresh);
  }

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="ml-auto size-8 border-y-0 border-r-0 rounded-none"
      onClick={handleClickButton}
    >
      <TrashIcon className="size-3.5" />
    </Button>
  );
}
