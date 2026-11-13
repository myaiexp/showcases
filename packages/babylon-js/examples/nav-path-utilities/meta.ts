// babylon-js example: Path smoothing and L-shaped paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path smoothing and L-shaped paths',
  summary:
    'One computePath result across a zig-zag of walls, drawn raw, rounded with GetChaikinSmoothPath (iteration slider) and turned into right-angle steps with GetLShapedPath. A dot follows the smoothed curve.',
  section: 'Crowd Navigation',
  tags: ['computePath', 'GetChaikinSmoothPath', 'GetLShapedPath', 'getRandomPointAround', 'getClosestPoint'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/utility.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/createNavMesh.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/intro.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
