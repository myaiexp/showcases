// Sigma.js example: compositing several edge fill layers
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Composing edge layers',
  summary:
    'A plain body, a source-to-target gradient and white dashes stacked in primitives.edges.layers. Toggle each layer to see how they composite back to front.',
  section: 'Styling edges',
  tags: ['edges', 'layers', 'layerPlain', 'layerGradient', 'layerDashed'],
  docs: [
    `${DOCS}/how-to/edges/fill-layers.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
