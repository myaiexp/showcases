// babylon-js example: Viewer API on a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewer API on a canvas",
  summary:
    "CreateViewerForCanvas builds a Viewer on a plain canvas with the element's options, then loadModel takes a File or bytes with pluginExtension. The panel drives animation, camera, tone mapping and exposure through the Viewer's properties and observables.",
  section: "Viewer",
  tags: ['CreateViewerForCanvas', 'Viewer', 'loadModel', 'updateCamera', 'postProcessing', 'onModelChanged'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/babylonViewer/v2/advancedUsage.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/elementInterface.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/cameraControls.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
