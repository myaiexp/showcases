// VFX-JS example: switching an effect on and off with vfx.add and vfx.remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Add and remove',
  summary:
    'vfx.add starts drawing an element through a shader and hides the original; vfx.remove stops drawing and restores its opacity. add is async, so the example awaits it before the next remove.',
  section: 'Getting Started',
  tags: ['vfx.add', 'vfx.remove', 'async', 'pixelate'],
  docs: ['pages/amagi-dev/vfx-js/getting-started.md', 'pages/amagi-dev/vfx-js/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
