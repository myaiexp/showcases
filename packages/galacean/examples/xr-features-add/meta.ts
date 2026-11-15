// galacean example: XR: adding plane, image and anchor features
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: adding plane, image and anchor features",
  summary:
    "addFeature is tried for plane tracking (every plane type), image tracking (with a reference image drawn here, 8 cm wide) and anchor tracking. Where the browser has no support the engine throws, and each attempt's result is listed with getFeature and features.length.",
  section: "XR",
  tags: ['XRManager.addFeature', 'XRManager.getFeature', 'XRPlaneTracking', 'XRImageTracking', 'XRReferenceImage', 'XRPlaneMode'],
  docs: [
    'repo/docs/en/xr/system/features.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
