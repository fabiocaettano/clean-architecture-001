export interface InputFindProductDto {
  id: string;
}

export interface InputCreateProductDto {
  type: string;
  name: string;
  price: number;
}

export interface OutputFindProductDto {
  id: string;
  name: string;
  price: number;
}