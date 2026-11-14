// babylon-js example: WebXR default experience
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WebXR default experience',
  summary:
    'scene.createDefaultXRExperienceAsync with a floor mesh for teleportation and controller-mesh loading off. On a browser with WebXR it adds the enter-XR button over the canvas and logs onStateChangedObservable; without WebXR, baseExperience is undefined and no button appears. WebXRSessionManager.IsSessionSupportedAsync reports each session mode.',
  section: 'WebXR',
  tags: ['createDefaultXRExperienceAsync', 'WebXRDefaultExperience', 'floorMeshes', 'IsSessionSupportedAsync', 'WebXRState'],
  docs: [
    'repo/content/features/featuresDeepDive/webXR/introToWebXR.md',
    'repo/content/features/featuresDeepDive/webXR/webXRExperienceHelpers.md',
    'repo/content/features/featuresDeepDive/webXR/webXRSessionManagers.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
