'use client';

import { PodcastPlayerContext } from '@/providers/podcast-player-provider';
import { useContext } from 'react';

export const usePodcastPlayer = () => useContext(PodcastPlayerContext);
