// css-doodle example: @PN against @pn in nested doodles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@PN against @pn in nested doodles',
  summary:
    'Both doodles repeat a nested doodle four times. The left uses lowercase @pn, which counts cells of the nested doodle, so each copy starts the list again. The right uses @PN, which reads the outer sequence and moves on.',
  section: 'Sequence',
  tags: ['@PN', '@pn', '@m', '@doodle'],
  docs: [
    'pages/css-doodle-com/reference/function-pn-upper.md',
    'pages/css-doodle-com/reference/function-pn.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
