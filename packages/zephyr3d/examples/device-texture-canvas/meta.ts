// zephyr3d example: A texture from a 2D canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A texture from a 2D canvas',
  summary:
    'createTexture2DFromImage turns an HTMLCanvasElement into a texture, and updateFromElement copies the canvas into it again each frame, so a running clock drawn with the 2D API appears on a quad.',
  section: 'Device API',
  tags: ['createTexture2DFromImage', 'updateFromElement', 'samplerOptions', 'setTexture'],
  docs: ['repo/apps/doc/web/en/texture.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
