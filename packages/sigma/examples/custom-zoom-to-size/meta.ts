// Sigma.js example: custom zoomToSizeRatioFunction settings
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Custom zoom-to-size function',
  summary:
    'Switches zoomToSizeRatioFunction between Math.sqrt, a constant and a linear ratio while the camera zooms in and out, so node and edge sizes visibly follow the zoom differently.',
  section: 'Technical guides',
  tags: ['zoomToSizeRatioFunction', 'camera', 'sizes', 'settings'],
  docs: [`${DOCS}/how-to/technical/custom-sizes.mdx`],
  provenance: 'pure',
  added: '2026-11-13',
});
