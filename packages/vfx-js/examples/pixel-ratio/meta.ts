// VFX-JS example: rendering the same shader at two pixelRatio settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'pixelRatio: render at lower resolution',
  summary:
    'VFX-JS renders at window.devicePixelRatio by default. On slow devices a lower pixelRatio draws fewer pixels: at 0.25 the canvas has a quarter of the width and height, so the same sinewave preset comes out blocky but costs a sixteenth of the fill. Each VFX has its own canvas, so the two sit side by side.',
  section: 'How it Works',
  tags: ['pixelRatio', 'VFXOpts', 'performance'],
  docs: ['repo/packages/vfx-js/src/types.ts', 'pages/amagi-dev/vfx-js/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
