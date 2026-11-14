// observable-plot example: Vector: election margin map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vector: election margin map',
  summary:
    'Each county gets a vector at its centroid under an albers-usa projection: length encodes the vote margin on a sqrt length scale, and rotate and stroke show which candidate won.',
  section: 'Mark: Vector',
  tags: ['vector', 'centroid', 'geo', 'projection', 'length', 'anchor'],
  docs: ['repo/docs/marks/vector.md', 'repo/docs/data/us-counties-10m.ts', 'repo/docs/data/us-presidential-election-2020.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
