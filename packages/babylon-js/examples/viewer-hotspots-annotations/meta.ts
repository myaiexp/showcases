// babylon-js example: Viewer hotspots and annotations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewer hotspots and annotations",
  summary:
    "Three world hotspots and one surface hotspot on the animated ring are set through the hotSpots property, with <babylon-viewer-annotation> labels that track them and focusHotSpot gliding the camera to each. queryHotSpot reads a hotspot's screen position.",
  section: "Viewer",
  tags: ['hotSpots', 'focusHotSpot', 'queryHotSpot', 'babylon-viewer-annotation', 'ViewerHotSpotResult', 'HTML3DAnnotationElement'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/babylonViewer/v2/hotspots.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/defaultUI.md',
    'repo/content/features/featuresDeepDive/babylonViewer/v2/elementInterface.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
