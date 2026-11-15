// d2 example: Arrowheads need an endpoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arrowheads need an endpoint',
  summary:
    'The source side of `x -> y` has no arrow, so `source-arrowhead.shape: diamond` does nothing there. Using `<->`, or setting the target arrowhead, gives the head somewhere to draw.',
  section: 'Connections',
  tags: ['arrowhead', 'caution'],
  docs: ['repo/docs/tour/connections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
