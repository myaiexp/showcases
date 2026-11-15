// zephyr3d example: Tone mapping and exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tone mapping and exposure',
  summary:
    'An HDR camera with ACES tone mapping: camera.toneMap switches the curve and camera.toneMapExposure scales the brightness going into it. With it off, a strong sun clips straight to white.',
  section: 'Post-processing',
  tags: ['HDR', 'toneMap', 'toneMapExposure'],
  docs: ['repo/apps/doc/web/en/posteffect-tonemap.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
