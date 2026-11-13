// Spark example: deleting and isolating splat regions with MULTIPLY opacity 0
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit delete a region',
  summary:
    'A SplatEdit in MULTIPLY mode whose SplatEditSdf has opacity 0 zeroes the alpha of every splat inside it, cutting a moving hole through a garden. Choose a box or a sphere, drag the position slider, and tick invert to keep only what is inside the shape.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'MULTIPLY', 'opacity', 'invert', 'BOX', 'SPHERE'],
  docs: ['repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
