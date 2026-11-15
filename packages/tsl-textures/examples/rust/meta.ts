// tsl-textures example: Rust
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rust',
  summary:
    'rust() on colorNode and rust.opacity() on opacityNode of a transparent, double-sided material, so unrusted areas drop out and the background shows through. The int iterations, rust amount, edge opacity, noise and both colours are live.',
  section: 'Textures',
  tags: ['rust', 'colorNode', 'opacityNode', 'transparent', 'iterations'],
  docs: ['repo/docs/rust.md', 'repo/src/rust.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
