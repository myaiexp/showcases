// babylon-js example: Obstacles through the tile cache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Obstacles through the tile cache',
  summary:
    'A tiled navmesh with maxObstacles and tileSize: cylinder and box obstacles close two gaps in a wall with addCylinderObstacle and addBoxObstacle (doNotWaitForCacheUpdate), one WaitForFullTileCacheUpdate per batch, then removeObstacle. The crowd, a computePath line and the debug navmesh all follow.',
  section: 'Crowd Navigation',
  tags: ['addCylinderObstacle', 'addBoxObstacle', 'removeObstacle', 'maxObstacles', 'tileSize', 'WaitForFullTileCacheUpdate', 'TileCache'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/obstacles.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/navParameters.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/tileCache.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
