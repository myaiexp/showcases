// gsap example: Nested label time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested label time',
  summary:
    'Three boxes run in nested timelines that start at different times and speeds, each with its own label. getNestedLabelTime() finds where a nested label lands on the parent so tl.seek() can jump straight to it.',
  section: 'Helper functions',
  tags: ['getNestedLabelTime', 'labels', 'getChildren', 'seek', 'timeScale', 'startTime'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/getNestedLabelTime.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
