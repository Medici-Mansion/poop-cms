import {
  // BookOpenCheck,
  LayoutDashboard,
  LucideUsersRound,
  LibraryBig,
} from 'lucide-react';
import { type NavItem } from 'types';

export const NavItems: NavItem[] = [
  {
    title: '대시보드',
    icon: LayoutDashboard,
    href: '/',
    color: 'text-sky-500',
  },
  {
    title: '회원 관리',
    icon: LucideUsersRound,
    href: '/',
    color: 'text-orange-500',
  },
  {
    title: '리소스 관리',
    icon: LibraryBig,
    href: '/resource/dogs',
    color: 'brown-orange-500',
  },
  // {
  //   title: 'Example',
  //   icon: BookOpenCheck,
  //   href: '/example',
  //   color: 'text-orange-500',
  //   isChidren: true,
  //   children: [
  //     {
  //       title: 'Example-01',
  //       icon: BookOpenCheck,
  //       color: 'text-red-500',
  //       href: '/example/1',
  //     },
  //     {
  //       title: 'Example-02',
  //       icon: BookOpenCheck,
  //       color: 'text-red-500',
  //       href: '/example/2',
  //     },
  //     {
  //       title: 'Example-03',
  //       icon: BookOpenCheck,
  //       color: 'text-red-500',
  //       href: '/example/3',
  //     },
  //   ],
  // },
];
