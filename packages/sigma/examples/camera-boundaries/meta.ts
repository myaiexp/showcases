// Sigma.js example: limiting how far the camera can zoom and pan
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Zoom and pan boundaries',
  summary:
    'minCameraRatio and maxCameraRatio clamp the zoom, and cameraPanBoundaries with a tolerance stops panning just past the graph. Buttons request absurd camera states and the readout shows what the camera actually accepted.',
  section: 'Adding interactivity',
  tags: ['camera', 'minCameraRatio', 'cameraPanBoundaries', 'settings'],
  docs: [
    `${DOCS}/how-to/interactivity/camera-viewport.mdx`,
    `${DOCS}/reference/settings.md`,
    `${DOCS}/reference/camera-api.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
