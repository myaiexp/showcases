// babylon-js example: Geospatial camera around a globe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geospatial camera around a globe',
  summary:
    'A GeospatialCamera orbiting an Earth-sized globe in ECEF coordinates, with a pick predicate so only the globe is dragged. Its center, yaw, pitch and radius are set directly; limits cap the radius and force a straight-down view far out, GeospatialClippingBehavior moves the near and far planes with altitude, and movement sets zoom speed, inertia and zoom-to-cursor.',
  section: 'Geospatial',
  tags: ['GeospatialCamera', 'GeospatialLimits', 'GeospatialClippingBehavior', 'pickPredicate', 'ECEF'],
  docs: ['repo/content/features/featuresDeepDive/geospatial/geospatialCamera.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
