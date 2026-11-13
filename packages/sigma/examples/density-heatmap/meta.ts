// Sigma.js example: a heatmap layer showing node density
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Density heatmap',
  summary:
    'createHeatmapProgram colours the density of node positions with a stop gradient and light shading. Re-binding under a fixed layer id replaces the layer, so sliders can retune it live.',
  section: 'Adding layers',
  tags: ['layer-webgl', 'heatmap', 'density', 'colorStops'],
  docs: [`${DOCS}/how-to/layers/webgl-layers.mdx`, 'repo/packages/layer-webgl/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
