// VFX-JS example: MatrixEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MatrixEffect',
  summary:
    'Green digital rain falls over a portrait, the picture\'s brightness shaping where it shows. MatrixEffect splits the element into a grid and drops random glyphs down each column. It takes its values through setParams rather than a params object.',
  section: '@vfx-js/effects',
  tags: ['MatrixEffect', 'effect', 'setParams', 'speed', 'tail', 'birthRate', 'contrast', 'invert'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/matrix.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
