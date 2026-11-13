// babylon-js example: WebXR features registry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'WebXR features registry',
  summary:
    'The features manager’s static registry, readable before any session exists: GetAvailableFeatures lists every registered XR feature (hit test, anchors, teleportation, hand tracking …), and GetAvailableVersions, GetStableVersionOfFeature and GetLatestVersionOfFeature show the versioning that enableFeature(name, "stable" | "latest") resolves.',
  section: 'WebXR',
  tags: ['WebXRFeaturesManager', 'GetAvailableFeatures', 'GetAvailableVersions', 'WebXRFeatureName'],
  docs: [
    'repo/content/features/featuresDeepDive/webXR/webXRFeaturesManager.md',
    'repo/content/features/featuresDeepDive/webXR/WebXRSelectedFeatures.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
