import { atom } from 'recoil';
import { BookData } from '@/utils/interface';

export const bookState = atom<BookData[]>({
  key: 'bookState',
  default: [],
});

export const pageState = atom({
  key: 'pageState',
  default: 1,
});

export const hasMoreState = atom({
  key: 'hasMoreState',
  default: true,
});
