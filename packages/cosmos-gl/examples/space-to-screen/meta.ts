// cosmos-gl example: Space to screen position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Space to screen position',
  summary:
    'spaceToScreenPosition turns a point’s graph position into pixels, so an HTML marker can sit on it and follow it through layout, zoom and pan. spaceToScreenRadius converts a point radius, so a ring around the point grows with the zoom when scalePointsOnZoom is on, and screenToSpacePosition goes the other way for the pointer.',
  section: 'View & zoom',
  tags: ['spaceToScreenPosition', 'screenToSpacePosition', 'spaceToScreenRadius', 'getPointRadiusByIndex', 'scalePointsOnZoom', 'trackPointPositionsByIndices', 'getTrackedPointPositionsMap'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
