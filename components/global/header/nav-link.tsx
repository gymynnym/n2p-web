'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderNavLinkProps {
  href: string;
  label: string;
  icon: string;
}

export default function HeaderNavLink({ href, label, icon }: Readonly<HeaderNavLinkProps>) {
  const pathname = usePathname();

  return (
    <Button size={'sm'} className="px-2" variant={pathname === href ? 'secondary' : 'ghost'} asChild>
      <Link href={href}>
        <Image src={icon} alt={label} width={16} height={16} /> {label}
      </Link>
    </Button>
  );
}
