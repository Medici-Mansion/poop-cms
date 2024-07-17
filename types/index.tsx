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
  [key: string]: string | undefined;
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

export interface GraphicFieldErrors {
  name?: string[];
  category?: string[];
  file?: string[];
  type?: string[];
}

export type EditorDataType = 'graphic' | undefined;

export interface GraphicContextType {
  handleGetGraphics: (data?: GraphicParams) => Promise<void>;
  category: string;
  setCategory: (category: string) => void;
  graphicInfo: {
    challengeLength: number;
    messageLength: number;
    stickerLength: number;
  };
}

export interface GraphicsInfo {
  messageLength: number;
  stickerLength: number;
  challengeLength: number;
}
