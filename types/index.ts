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

export type pageResponse<T> = {
  list: T[];
} & pageInfo;

export type pageInfo = {
  page: number;
  took: number;
  total: number;
  totalPage: number;
  setCurPage?: (page: number) => void;
};
export interface Breed {
  id: string;
  nameKR: string;
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
  [key: string]: string | number | undefined;
  graphicType?: string;
  category: string;
  string?: string;
  page?: number;
}

export interface GraphicData {
  category: 'Message' | 'Sticker' | 'Challenge';
  name: string;
  file: File;
  type: 'GIF' | 'Lottie';
  url: string;
  id: string;
}
export interface BreedData {
  id: string;
  nameKR: string;
  nameEN: string;
  file: File;
  avatar: string;
}

export interface BreedFieldErrors {
  nameKR?: string[];
  nameEN?: string[];
  file?: string[];
}

export interface GraphicFieldErrors {
  name?: string[];
  category?: string[];
  file?: string[];
  type?: string[];
}
export interface ReportFieldErrors {
  category?: string[];
  title?: string[];
  author?: string[];
  reason?: string[];
  reportedDate?: string[];
  status?: string[];
}

export type EditorDataType = 'breed' | 'graphic' | 'report' | 'ask' | undefined;

export interface GraphicContextType {
  handleGetGraphics: () => Promise<void>;
  setCategory: (category: string) => void;
  setOrder: (order: string) => void;
  setFormat: (format: string) => void;

  graphicInfo: {
    challengeLength: number;
    messageLength: number;
    stickerLength: number;
  };
}
export interface BreedContextType {
  handleGetBreeds: (query?: GetBreedsParams) => Promise<void>;
}

export interface GraphicsInfo {
  messageLength: number;
  stickerLength: number;
  challengeLength: number;
}

export interface GetBreedsParams {
  [key: string]: string | number | undefined;
  orderKey?: string;
  direction?: string;
  cursor?: string;
  page?: number;
}

export interface GetSupportsParams {
  [key: string]: string | number | undefined;
  graphicType?: string;
  category: string;
  string?: string;
  page?: number;
}

// 더미 데이터 타입(변경 예정)
export interface Report {
  id: string;
  type: string;
  category: string;
  title: string;
  author: string;
  reason: string;
  reportedDate: string;
  status: string;
  toon: string;
}

export interface SupportContextType {
  handleGetSupports: () => Promise<void>;
  setCategory: (category: string) => void;
  setOrder: (order: string) => void;
  setFormat: (format: string) => void;
  category: string;
}
export interface AskContextType {
  // handleGetAsks: () => Promise<void>;
  // setAskCategory: (category: string) => void;
  // setOrder: (order: string) => void;
  // setFormat: (format: string) => void;
}
