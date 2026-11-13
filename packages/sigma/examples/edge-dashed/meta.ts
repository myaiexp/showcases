// Sigma.js example: layerDashed with per-edge patterns
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Dashed edges',
  summary:
    'layerDashed reads dashSize, gapSize and dashOffset from edge attributes, so each edge gets its own pattern. Switch between butt and round caps, and watch the offset animate.',
  section: 'Styling edges',
  tags: ['edges', 'layerDashed', 'dash', 'caps'],
  docs: [
    `${DOCS}/how-to/edges/fill-layers.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
