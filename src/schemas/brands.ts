export const brands = [
  'Aurora',
  'Nimbus',
  'Vertex',
  'Solace',
  'Quantum',
  'Everpeak',
] as const;

export type Brand = (typeof brands)[number];
