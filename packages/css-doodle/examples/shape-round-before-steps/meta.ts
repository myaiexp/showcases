// css-doodle example: Rounding happens before the steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rounding happens before the steps",
  summary:
    "The corners are rounded before the steps run, wherever round is written, so a scale scales the radius too. The two orders give the same shape.",
  section: 'Shapes',
  tags: ['@shape', 'round', 'scale'],
  docs: ['pages/css-doodle-com/reference/function-shape.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
