import { ReactNode } from 'react';

interface PodcastListProps {
  children: ReactNode;
}

export default function PodcastList({ children }: Readonly<PodcastListProps>) {
  return <div role="list">{children}</div>;
}
