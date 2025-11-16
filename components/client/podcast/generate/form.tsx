'use client';

import { generateGeekNewsPodcast } from '@/apis/client/geeknews';
import { generateHackerNewsPodcast } from '@/apis/client/hackernews';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TEXT_MODEL_OPTIONS, TTS_MODEL_OPTIONS } from '@/constants/options';
import { podcastGenerateSchema } from '@/schemas/podcast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LucideIcon,
  WandSparklesIcon,
  CircleDashedIcon,
  TextAlignStartIcon,
  MicIcon,
  FileUpIcon,
  CircleCheckIcon,
  CircleXIcon,
  TextInitialIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const BUTTON_OPTIONS: Record<
  PodcastGenerateStatus,
  { icon: LucideIcon; label: string; progress: number; disabled: boolean }
> = {
  idle: { icon: WandSparklesIcon, label: 'Generate Podcast', progress: 0, disabled: false },
  pending: { icon: CircleDashedIcon, label: 'Pending...', progress: 0, disabled: true },
  generating_text: { icon: TextAlignStartIcon, label: 'Generating Text...', progress: 20, disabled: true },
  generating_audio: { icon: MicIcon, label: 'Generating Audio...', progress: 60, disabled: true },
  uploading: { icon: FileUpIcon, label: 'Uploading...', progress: 90, disabled: true },
  completed: { icon: CircleCheckIcon, label: 'Completed', progress: 100, disabled: false },
  failed: { icon: CircleXIcon, label: 'Failed', progress: 0, disabled: false },
};

interface PodcastGenerateFormProps {
  type: NewsType;
}

export default function PodcastGenerateForm({ type }: Readonly<PodcastGenerateFormProps>) {
  const form = useForm<z.infer<typeof podcastGenerateSchema>>({
    resolver: zodResolver(podcastGenerateSchema),
    defaultValues: { textModel: 'gpt-4.1-mini', ttsModel: 'gemini-2.5-flash-tts', filenamePrefix: `${type}_` },
  });
  const router = useRouter();
  const [status, setStatus] = useState<PodcastGenerateStatus>('idle');
  const buttonOptions = BUTTON_OPTIONS[status];

  useEffect(() => {
    switch (status) {
      case 'completed':
        toast.success('Podcast generated successfully!');
        router.refresh();
        return;
      case 'failed':
        toast.error('Failed to generate podcast. Please try again.');
        return;
    }
  }, [router, status]);

  function handleSubmit(data: z.infer<typeof podcastGenerateSchema>) {
    switch (status) {
      case 'completed':
      case 'failed':
        setStatus('idle');
        return;
    }

    const generatePodcast = type === 'hackernews' ? generateHackerNewsPodcast : generateGeekNewsPodcast;
    const controller = new AbortController();
    generatePodcast(data, {
      signal: controller.signal,
      onChunk: (chunk) => setStatus(chunk),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="filenamePrefix"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Filename Prefix</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder="Filename Prefix" disabled={buttonOptions.disabled} {...field} />
                  <InputGroupAddon>
                    <TextInitialIcon />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col lg:flex-row gap-2">
          <FormField
            control={form.control}
            name="textModel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Text Model</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Text Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TEXT_MODEL_OPTIONS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ttsModel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>TTS Model</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="TTS Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TTS_MODEL_OPTIONS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type={'submit'}
          variant={'secondary'}
          className="relative w-full border cursor-pointer overflow-hidden"
          {...buttonOptions}
        >
          <buttonOptions.icon /> {buttonOptions.label}
          <Progress className="absolute h-full rounded-none" value={buttonOptions.progress} />
        </Button>
      </form>
    </Form>
  );
}
