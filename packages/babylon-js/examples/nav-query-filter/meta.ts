// babylon-js example: Per-query QueryFilter and area costs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-query QueryFilter and area costs',
  summary:
    'A tileCacheMeshProcess tags the polygons of a muddy gap with their own area id and flag. computePath then takes a per-query QueryFilter: no filter goes through the mud, a small areaCost still does, a big one or excludeFlags sends the route round the long way.',
  section: 'Crowd Navigation',
  tags: ['QueryFilter', 'areaCost', 'excludeFlags', 'TileCacheMeshProcess', 'computePath', 'tileSize'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/options.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/tileCache.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/navParameters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
