type PodcastGenerateStatus =
  | 'idle'
  | 'pending'
  | 'generating_text'
  | 'generating_audio'
  | 'uploading'
  | 'completed'
  | 'failed';

type TextModel = 'gpt-4.1-mini' | 'gpt-4.1';
type TTSModel = 'gemini-2.5-flash-tts' | 'gemini-2.5-pro-tts';
