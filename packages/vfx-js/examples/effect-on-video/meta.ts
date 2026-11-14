// VFX-JS example: Effect on a video
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Effect on a video',
  summary:
    'A CMYK halftone over a playing <video>. VFX-JS uploads the video\'s current frame on every tick, so the effect is redrawn from the moving picture. The video plays an animation drawn in code.',
  section: '@vfx-js/effects',
  tags: ['effect', 'video', 'HalftoneEffect', 'cmyk', 'liveVideo'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/halftone.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
