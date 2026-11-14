// VFX-JS example: DitherEffect styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DitherEffect styles',
  summary:
    'One portrait, six dither styles: four Bayer matrix sizes, blue noise and a plain threshold. With mono on, the result is a single tinted channel (monoColor), like a one-colour screen. The card steps through the styles; the full view has a select.',
  section: '@vfx-js/effects',
  tags: ['DitherEffect', 'style', 'bayer2', 'bayer16', 'blueNoise', 'threshold', 'mono', 'monoColor'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/dither.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
