// d2 example: Arrowhead labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arrowhead labels',
  summary:
    'A `source-arrowhead` or `target-arrowhead` can carry its own label, written as `source-arrowhead.label: 1`. The labels skip autolayout, so the docs advise keeping them short. A value before the map, as in `target-arrowhead: * {shape: cf-many}`, is that end\'s label, and the map sets its head.',
  section: 'Connections',
  tags: ['arrowhead', 'label'],
  docs: ['repo/docs/tour/connections.md', 'repo/static/d2/connections-5.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
