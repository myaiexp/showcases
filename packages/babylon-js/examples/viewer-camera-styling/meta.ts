// babylon-js example: Viewer camera and CSS styling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewer camera and CSS styling",
  summary:
    "The viewer's ArcRotateCamera is set through the camera-orbit, camera-target and reset-mode attributes, with the mouse, touch and keyboard controls listed. The toolbar is themed with --ui-* CSS variables and a ::part(tool-bar) rule.",
  section: "Viewer",
  tags: ['camera-orbit', 'camera-target', 'reset-mode', 'CSS variables', '::part', 'tool-bar', 'progress-bar'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/babylonViewer/v2/cameraControls.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/elementStyling.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/defaultUI.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/elementInterface.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
