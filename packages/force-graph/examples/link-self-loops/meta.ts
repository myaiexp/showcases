// force-graph example: Link styling: self-referencing links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: self-referencing links',
  summary:
    'A link with the same source and target is drawn as a loop around the node, its size proportional to linkCurvature. linkSelfCurveRotation turns the loop in degrees, so several loops on one node can be spread around it.',
  section: 'Link styling',
  tags: ['linkCurvature', 'linkSelfCurveRotation', 'linkColor', 'linkLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
