export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: {
    id?: number;
    width: number;
    height: number;
  };
  weight: number;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  description: string;
  date: Date;
  productId: number;
}
