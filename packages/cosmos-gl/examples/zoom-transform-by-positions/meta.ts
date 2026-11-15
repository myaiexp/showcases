// cosmos-gl example: Zoom transform by positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom transform by positions',
  summary:
    'setZoomTransformByPointPositions(positions, duration, scale, padding) centres the view on a set of positions. Without a scale it zooms to fit them; with one, it keeps that zoom factor and only centres them.',
  section: 'View & zoom',
  tags: ['setZoomTransformByPointPositions', 'fitView', 'enableSimulation', 'rescalePositions'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
