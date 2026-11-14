// VFX-JS example: GradientMapEffect repeat and mix space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GradientMapEffect repeat and mix space',
  summary:
    'The same four-stop gradient on a flower bed, folded three ways. repeat decides what happens past the ends (none, repeat, mirror), frequency repeats the gradient across the brightness range, and mixSpace picks the colour space used between stops (srgb, linear, oklab).',
  section: '@vfx-js/effects',
  tags: ['GradientMapEffect', 'repeat', 'mirror', 'frequency', 'mixSpace', 'oklab'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/gradient-map.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
