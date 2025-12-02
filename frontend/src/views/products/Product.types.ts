interface ProductDto {
  name: string;
  id: string;
  description: string;
  price: string;
  stock: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { ProductDto };

export interface CreateProductDto {
  name: string;
  description: string;
  price: string;
  stock: number;
}
