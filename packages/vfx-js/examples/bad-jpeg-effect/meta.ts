// VFX-JS example: BadJpegEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BadJpegEffect',
  summary:
    'A landscape that looks like a JPEG saved too many times: BadJpegEffect subsamples colour, quantises 8x8 blocks and repeats the round trip. It is a shader imitation, not a real encoder. quality, iterations and downscale are plain fields on the effect, changed live.',
  section: '@vfx-js/effects',
  tags: ['BadJpegEffect', 'effect', 'quality', 'iterations', 'downscale'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/bad-jpeg.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
