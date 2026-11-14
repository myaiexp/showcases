// BloomEffect from @vfx-js/effects with live threshold, intensity and scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BloomEffect',
  summary:
    'Bright parts of the night city glow past their edges: BloomEffect keeps what is above a soft threshold, blurs it in a pyramid and adds it back. pad gives the glow room outside the image. Its params are read every frame, so the sliders (and the card) change them in place.',
  section: '@vfx-js/effects',
  tags: ['BloomEffect', 'effect', 'threshold', 'intensity', 'scatter', 'pad', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/bloom.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
