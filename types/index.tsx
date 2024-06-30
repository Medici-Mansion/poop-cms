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
  result: {
    resultCode: number;
    resultMessage: string;
  };
  body: T;
}

export interface QueryParams {
  [key: string]: string;
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

export interface Graphic {
  id: string;
  name: string;
  type: string;
  url: string;
  category: string;
}

export interface GraphicParams {
  graphicType?: string;
  category: string;
  string?: string;
}

export interface GraphicData {
  category: 'Message' | 'Sticker' | 'Challenge';
  name: string;
  file: File;
  type: 'GIF' | 'Lottie';
  url: string;
  id: string;
}

export type UploadNewGraphicsState =
  | {
      fieldErrors: {
        category?: string;
        name?: string;
        file?: string;
      };
    }[]
  | undefined;
