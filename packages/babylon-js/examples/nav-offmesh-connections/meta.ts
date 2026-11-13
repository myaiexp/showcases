// babylon-js example: Off-mesh connections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Off-mesh connections',
  summary:
    'Two platforms separated by a pit make two disconnected navmesh islands. offMeshConnections in the navmesh parameters add a two-way jump link and a one-way link, so crowd agents shuttle across, hopping over the gap along each link.',
  section: 'Crowd Navigation',
  tags: ['offMeshConnections', 'IOffMeshConnection', 'bidirectional', 'createNavMeshAsync', 'createCrowd', 'agentGoto'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/offMeshConnections.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/whatsNew/navParameters.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/crowdAgents.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
