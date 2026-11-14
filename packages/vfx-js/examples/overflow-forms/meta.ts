// VFX-JS example: the three forms of the overflow option, made visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'overflow: room outside the element',
  summary:
    'A shader draws only inside the element unless overflow gives it more room: a number of px on every side, [top, right, bottom, left], or true for the whole canvas. In the extra area uv goes below 0 and above 1; this shader stripes that area so its size shows (true fills the whole stage, which clips the canvas).',
  section: 'How it Works',
  tags: ['overflow', 'uv', 'custom shader'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'pages/amagi-dev/vfx-js/shaders.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
