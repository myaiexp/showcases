// zephyr3d example: Many lights with clustered lighting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Many lights with clustered lighting',
  summary:
    'A drifting grid of up to 255 coloured PointLights over boxes and a floor. Clustered lighting handles up to 255 lights in the frustum with at most 16 per pixel, and a small range per light keeps each to the pixels near it.',
  section: 'Lighting',
  tags: ['PointLight', 'range', 'intensity', 'clustered lighting'],
  docs: ['repo/apps/doc/web/en/lighting-intro.md', 'repo/apps/doc/web/en/lighting-direct.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
