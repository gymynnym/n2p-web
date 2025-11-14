'use client';

import { createContext, useState } from 'react';

type PodcastPlayerContextProps = {
  filename?: string;
  setFilename: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const PodcastPlayerContext = createContext<PodcastPlayerContextProps>({
  setFilename: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export default function PodcastPlayerProvider({ children }: Readonly<ProviderProps>) {
  const [filename, setFilename] = useState<string>();

  return <PodcastPlayerContext.Provider value={{ filename, setFilename }}>{children}</PodcastPlayerContext.Provider>;
}
