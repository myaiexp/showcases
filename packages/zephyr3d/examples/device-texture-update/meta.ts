// zephyr3d example: Updating a texture region
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Updating a texture region',
  summary:
    'A 64x64 texture is cleared once and then painted with Texture2D.update(pixels, x, y, width, height): a small coloured block follows a curve, and only that rectangle is uploaded each frame.',
  section: 'Device API',
  tags: ['createTexture2D', 'update', 'rgba8unorm', 'setTexture', 'dispose'],
  docs: ['repo/apps/doc/web/en/texture.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
