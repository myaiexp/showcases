// Sigma.js example: contours drawn around each community with a WebGL layer
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Community contours (@sigma/layer-webgl)',
  summary:
    'bindWebGLLayer attaches a createContoursProgram layer to a custom depth layer, one per community, each removable through its own cleanup function.',
  section: 'Adding layers',
  tags: ['layer-webgl', 'contours', 'depthLayers', 'communities'],
  docs: [`${DOCS}/how-to/layers/webgl-layers.mdx`, 'repo/packages/layer-webgl/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
