// aframe example: webxr: the session options a scene will request
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "webxr: the session options a scene will request",
  summary: "The webxr system holds the options passed to requestSession: referenceSpaceType, requiredFeatures, optionalFeatures and overlayElement. The scene sets the docs' hit-test, local-floor, dom-overlay and unbounded features and an overlay element, and the read-out prints the system's data and sessionReferenceSpaceType. The options are fixed after the scene starts.",
  section: 'Components',
  tags: ["webxr", "referenceSpaceType", "requiredFeatures", "optionalFeatures", "overlayElement", "sessionReferenceSpaceType", "systems"],
  docs: ["repo/docs/components/webxr.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
