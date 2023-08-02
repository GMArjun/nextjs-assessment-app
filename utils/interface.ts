export interface BookListData {
  data: BookData[];
  hasNext: boolean;
}

export interface BookData {
  title: string;
  price: number;
  discountRate: number;
  description: string;
  coverImage: string;
}

export interface Comments {
  name: string;
  userVerified: boolean;
  userImg: string;
  time: string;
  content: string;
  likes: string;
  replies?: Comments[];
}
