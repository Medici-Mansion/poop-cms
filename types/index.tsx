import { type LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}

// 서버에서 내려주는 응답 구조
export interface APIResponse<T> {
  data: T;
}

// 견종 정보 리스트
export interface BreedList {
  [key: string]: Breed[];
}

export interface Breed {
  id: string;
  name: string;
  nameEN: string;
  avatar: string;
}
