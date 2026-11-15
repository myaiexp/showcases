// css-doodle example: A dot that follows the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A dot that follows the pointer',
  summary:
    '@ux and @uy are the pointer position over the doodle in pixels from its top-left corner. Multiplying by 1px makes lengths for @place, so the dot follows the pointer. Cards fake the pointer with a small scripted path.',
  section: 'Cell functions',
  tags: ['@ux', '@uy', '@place', 'pointer'],
  docs: [
    'pages/css-doodle-com/reference/function-ux.md',
    'pages/css-doodle-com/reference/function-uw.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
