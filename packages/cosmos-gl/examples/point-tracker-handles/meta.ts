// cosmos-gl example: Point tracker handles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point tracker handles',
  summary:
    'graph.simulation.trackPoints(indices) returns a handle that follows a few points. Two independent handles here each place their own coloured markers every frame from positions({ nonBlocking: true }) without reading the whole graph back, and setIndices() moves a handle to other points.',
  section: 'Headless & shared device',
  tags: ['trackPoints', 'PointTracker', 'positions', 'setIndices', 'nonBlocking'],
  docs: ['repo/docs/host-embedding/README.md', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
