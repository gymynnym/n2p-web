type PodcastGenerateStatus =
  | 'idle'
  | 'pending'
  | 'generating_text'
  | 'generating_audio'
  | 'uploading'
  | 'completed'
  | 'failed';
