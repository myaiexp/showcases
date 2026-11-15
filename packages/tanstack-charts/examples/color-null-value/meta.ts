// tanstack-charts example: Null color values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Null color values',
  summary:
    'On the built-in and configured-scale paths a null color value maps to the first color of the range, or currentColor when there is none. Rows with a missing category are therefore painted like the first category rather than dropped, which is worth knowing before trusting a legend. A custom resolver would own that mapping.',
  section: 'Scales, Guides, and Color',
  tags: ['color channel', 'null', 'ChartKey', 'currentColor'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
