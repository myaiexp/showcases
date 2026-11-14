// observable-plot example: Line: geodesic voyage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: geodesic voyage',
  summary:
    'Darwin’s Beagle route on an equirectangular projection. With the default auto curve the segments follow great circles and wrap at the antimeridian; the linear curve draws plain projected segments. A varying stroke colours the line by order.',
  section: 'Mark: Line',
  tags: ['line', 'geo', 'projection', 'curve', 'stroke', 'z'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/features/projections.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
