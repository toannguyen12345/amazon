// Chỉ dùng đúng 6 brand cho toàn bộ data
export const brands = [
  'Aurora',
  'Nimbus',
  'Vertex',
  'Solace',
  'Quantum',
  'Everpeak',
] as const;

export type Brand = (typeof brands)[number];
