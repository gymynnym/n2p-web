import '@/app/globals.css';
import GlobalHeader from '@/components/global/header';
import GlobalPodcastPlayer from '@/components/global/podcast-player';
import { Toaster } from '@/components/ui/sonner';
import PlayerProvider from '@/providers/podcast-player-provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import ThemeProvider from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'n2p(news to podcast)',
  description: 'Generate podcasts from news articles using AI.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider attribute={'class'} defaultTheme="light" disableTransitionOnChange>
            <PlayerProvider>
              <GlobalHeader />
              {children}
              <GlobalPodcastPlayer />
              <Toaster position="top-center" richColors expand={true} />
            </PlayerProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
