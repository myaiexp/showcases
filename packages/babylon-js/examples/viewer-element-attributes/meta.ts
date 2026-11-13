// babylon-js example: Viewer element attributes and events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewer element attributes and events",
  summary:
    "A <babylon-viewer> element shows a glb from a blob URL, with attributes for tone mapping, shadows, exposure, auto orbit and animation speed, an event log, and viewerDetails reaching the model's materials for a wireframe toggle.",
  section: "Viewer",
  tags: ['babylon-viewer', 'HTML3DElement', 'viewerDetails', 'camera-auto-orbit', 'tone-mapping', 'modelchange'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/babylonViewer/v2/elementInterface.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/defaultUI.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/advancedUsage.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
