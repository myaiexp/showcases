// babylon-js example: Navmesh from meshes with a debug overlay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Navmesh from meshes with a debug overlay',
  summary:
    'NavigationPlugin V2 builds a navmesh from a ground and three walls with createNavMeshAsync (keepIntermediates on), then shows it as createDebugNavMesh and as NavigationDebugger layers: the navmesh, poly mesh, contours, compact heightfield distance field and the BV tree.',
  section: 'Crowd Navigation',
  tags: ['CreateNavigationPluginAsync', 'createNavMeshAsync', 'createDebugNavMesh', 'NavigationDebugger', 'DebugLayerOption', 'keepIntermediates'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/createNavMesh.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/intro.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/debugger.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/navParameters.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
