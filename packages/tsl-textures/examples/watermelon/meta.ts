// tsl-textures example: Watermelon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Watermelon',
  summary:
    'watermelon() on a colorNode: stripes of one colour over a background, using its default uvs (equirectUV of the model\'s positions). The int stripes count, scale, stripe variation, noise and both colours are live.',
  section: 'Textures',
  tags: ['watermelon', 'colorNode', 'stripes', 'uvs', 'equirectUV'],
  docs: ['repo/docs/watermelon.md', 'repo/src/watermelon.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
