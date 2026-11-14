// babylon-js example: Crowd agents and the reach-target observer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crowd agents and the reach-target observer',
  summary:
    'plugin.createCrowd, addAgent with agent parameters and agentGoto drive capsules through a walled arena. onReachTargetObservable hands each agent a new random destination, and agents turn towards their velocity. Click the ground in the full view to call them all.',
  section: 'Crowd Navigation',
  tags: ['createCrowd', 'addAgent', 'agentGoto', 'onReachTargetObservable', 'getAgentVelocity', 'getClosestPoint', 'reachRadius'],
  docs: [
    'repo/content/features/featuresDeepDive/crowdNavigation/crowdAgents.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/createNavMesh.md',
    'repo/content/features/featuresDeepDive/crowdNavigation/v2/intro.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
