// Sigma.js example: displaying sigma's GPU picking framebuffer
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Seeing the picking layer',
  summary:
    'DEBUG_displayPickingLayer swaps the image for the colour-ID framebuffer sigma reads under the pointer. Edge events are on, so edges appear in it too.',
  section: 'Technical guides',
  tags: ['debug', 'picking', 'DEBUG_displayPickingLayer', 'pickingDownSizingRatio'],
  docs: [`${DOCS}/how-to/technical/performance.md`, `${DOCS}/concepts/rendering.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
