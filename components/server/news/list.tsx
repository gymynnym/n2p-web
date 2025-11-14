import { ReactNode } from 'react';

interface NewsListProps {
  children: ReactNode;
}

export default function NewsList({ children }: Readonly<NewsListProps>) {
  return <div role="list">{children}</div>;
}
