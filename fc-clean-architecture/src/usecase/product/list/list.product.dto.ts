export interface InputCreateProductDto {
  name: string;
  price: number;
}

type Product = {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductDto {
  products: Product[];
}