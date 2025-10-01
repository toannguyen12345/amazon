import { useMemo } from 'react';
import {
  brands as schemaBrands,
  categories as schemaCategories,
} from '@/schemas';

export function useTax() {
  const brands = useMemo(() => [...schemaBrands], []);
  const categories = useMemo(() => [...schemaCategories], []);
  return { brands, categories } as const;
}
