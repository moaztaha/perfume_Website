export type CategoryProductRelation = {
  id: string;
  name: string;
  price: number;
  subtitle?: string;
};

export type Category = {
  id: string;
  documentId: string;
  name: string;
  subtitle?: string;
  description: string;
  image: string;
  products?: CategoryProductRelation[];
};
