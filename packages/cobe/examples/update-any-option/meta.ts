// cobe example: update() changes any option on a live globe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'update() changes any option',
  summary:
    'One globe moves between three looks: dark, colours, brightness, lighting and scale all change while it keeps turning. Every value goes through update() each frame, blended over a second, and the globe is never recreated.',
  section: 'Methods',
  tags: ['update', 'dark', 'baseColor', 'glowColor', 'markerColor', 'mapBrightness', 'diffuse', 'scale'],
  docs: ['pages/cobe-vercel-app.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
