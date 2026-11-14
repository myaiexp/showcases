// VFX-JS example: DitherEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DitherEffect',
  summary:
    'A test card cut down to a few colour levels per channel, with a Bayer pattern deciding which way each pixel rounds. size is the pattern scale in px, levels the steps per channel; brightness and contrast act before quantising.',
  section: '@vfx-js/effects',
  tags: ['DitherEffect', 'effect', 'levels', 'size', 'brightness', 'contrast', 'params'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/dither.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
