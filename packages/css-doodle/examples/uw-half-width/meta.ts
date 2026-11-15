// css-doodle example: Sizes from the doodle: @uw as a length
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sizes from the doodle: @uw as a length',
  summary:
    '@uw and @uh are unitless numbers, so a length needs a unit: $px(@uw / 2) is half the width, and @uw(*1px) does the same with operations. The box keeps half the doodle width as it is squeezed.',
  section: 'Cell functions',
  tags: ['@uw', '@uh', '$px', '@size', 'resize'],
  docs: [
    'pages/css-doodle-com/reference/function-uw.md',
    'pages/css-doodle-com/reference/function-dollar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
