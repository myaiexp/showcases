// tsl-textures example: Protozoa
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Protozoa',
  summary:
    'protozoa() on a colorNode: a pool of organisms whose position and shape depend on the viewing position (the default matcap coordinate), so turning the model or orbiting the camera moves them. Fat, amount and three colours are live.',
  section: 'Textures',
  tags: ['protozoa', 'colorNode', 'matcap', 'fat', 'amount'],
  docs: ['repo/docs/protozoa.md', 'repo/src/protozoa.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
