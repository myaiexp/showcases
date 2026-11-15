// css-doodle example: Pointer-colored conic gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer-colored conic gradient',
  summary:
    'Inside $() the pointer values are written out as CSS math, so $deg(@ux - @uy) is an angle and the hsl() hues are sums of them. Moving the pointer turns and recolors a conic gradient.',
  section: 'Cell functions',
  tags: ['@ux', '@uy', '$deg', 'conic-gradient', 'pointer'],
  docs: [
    'pages/css-doodle-com/reference/function-ux.md',
    'pages/css-doodle-com/reference/function-dollar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
