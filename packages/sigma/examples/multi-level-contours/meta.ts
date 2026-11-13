// Sigma.js example: stacked contour levels around groups of nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Multi-level contours',
  summary:
    'createContoursProgram with several { color, threshold } levels and a border, drawn per community. Sliders change the level count and the influence radius.',
  section: 'Adding layers',
  tags: ['layer-webgl', 'contours', 'levels', 'threshold'],
  docs: [`${DOCS}/how-to/layers/webgl-layers.mdx`, 'repo/packages/layer-webgl/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
