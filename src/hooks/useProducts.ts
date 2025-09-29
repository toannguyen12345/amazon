import mock from '@/data/mock-data.json';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
}

export interface UseProductsResult {
  products: Product[];
  brands: string[];
  categories: string[];
}

export function useProducts(): UseProductsResult {
  const products = (mock.products as unknown as Product[]) ?? [];
  const brands = (mock.brands as unknown as string[]) ?? [];
  const categories = (mock.categories as unknown as string[]) ?? [];

  return { products, brands, categories };
}
