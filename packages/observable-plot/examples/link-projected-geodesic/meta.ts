// observable-plot example: Link: geodesic and linear on a globe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link: geodesic and linear on a globe',
  summary:
    'Two links from San Francisco to Paris on an equal-earth projection. The default auto curve follows the shortest path on the sphere; curve linear draws a straight line between the projected endpoints.',
  section: 'Mark: Link',
  tags: ['link', 'curve', 'projection', 'sphere', 'geo', 'markerStart', 'markerEnd'],
  docs: ['repo/docs/marks/link.md', 'repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
