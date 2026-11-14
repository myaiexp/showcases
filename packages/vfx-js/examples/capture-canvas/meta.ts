// VFX-JS example: a 2D canvas animation fed to VFX-JS with update(canvas)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Capture a canvas',
  summary:
    'A <canvas> is copied into the texture once, when it is added. This one is redrawn every frame with the 2D API; calling vfx.update(canvas) after each drawing keeps the halftone version moving, and without it the effect shows the last copy.',
  section: 'How it Works',
  tags: ['canvas', 'vfx.update', 'capture', 'halftone'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/vfx.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
