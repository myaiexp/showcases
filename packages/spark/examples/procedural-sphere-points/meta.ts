// Spark example: constructSpherePoints with maxDepth, radius, colour function and filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural sphere points',
  summary:
    'A sphere of small oriented discs from constructSpherePoints, coloured by latitude with a colour function. A maxDepth slider shows the point count growing with each subdivision, radius rescales the sphere, and a select applies a filter that keeps only a band, a hemisphere or stripes.',
  section: 'Procedural Splats',
  tags: ['constructSpherePoints', 'maxDepth', 'filter', 'radius', 'pointRadius', 'color'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
