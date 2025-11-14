'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CopyToClipboardButtonProps {
  url: string;
}

export default function CopyToClipboardButton({ url }: Readonly<CopyToClipboardButtonProps>) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success('Link copied to clipboard!', { icon: <ClipboardCheckIcon size={16} /> });
      setTimeout(() => setCopied(false), 1000); // Reset after 1 second
    });
  }

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      onClick={handleClick}
      className={cn('self-center transition-colors', copied && 'bg-green-400 hover:bg-green-400/80 border-green-300')}
    >
      <ClipboardCheckIcon
        className={cn('absolute text-white transition-all', copied ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90')}
      />
      <ClipboardIcon
        className={cn('absolute transition-all', copied ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0')}
      />
    </Button>
  );
}
