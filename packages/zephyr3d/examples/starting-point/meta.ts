// zephyr3d example: A reasonable starting point: sky, IBL, sun and post effects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A reasonable starting point: sky, IBL, sun and post effects',
  summary:
    'The getting-started track put together: a scatter sky, IBL ambient light at strength 0.6, a shadow-casting sun, and HDR, tone mapping, bloom and FXAA on the camera. Toggle each part off to see what it adds.',
  section: 'Getting Started',
  tags: ['skyType', 'env.light', 'castShadow', 'HDR', 'toneMap', 'bloom', 'FXAA'],
  docs: ['repo/apps/doc/web/en/first-polish.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
