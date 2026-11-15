// d2 example: Position: a tooltip that stays visible
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position: a tooltip that stays visible',
  summary:
    'A `tooltip` normally shows on hover, but a `tooltip.near` value pins it to a point as a permanent note. The pipeline\'s codedeploy step carries its remark at center-left.',
  section: 'Positions',
  tags: ['near', 'tooltip'],
  docs: ['repo/docs/tour/positions.md', 'repo/static/d2/tooltip-near.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
