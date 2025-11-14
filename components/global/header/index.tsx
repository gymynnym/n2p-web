import { ThemeSwitch } from '@/components/client/common';
import HeaderNavLink from '@/components/global/header/nav-link';

const navLinks = [
  {
    href: '/hackernews',
    label: 'HackerNews',
    icon: '/icons/hackernews.svg',
  },
  {
    href: '/geeknews',
    label: 'GeekNews',
    icon: '/icons/geeknews.webp',
  },
];

export default function GlobalHeader() {
  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-card border-b backdrop-blur-md">
      <nav className="container flex items-center gap-2 mx-auto px-4 h-14">
        {navLinks.map(({ href, label, icon }) => (
          <HeaderNavLink key={href} href={href} label={label} icon={icon} />
        ))}
        <ThemeSwitch className="ml-auto" />
      </nav>
    </header>
  );
}
