// Sigma.js example: layerGradient stop lists
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Gradient edges',
  summary:
    'layerGradient blends endpoint node colours along each edge. Try stop lists that fade through transparency, leave a short stub, switch hard at the midpoint, or enable the gradient per edge.',
  section: 'Styling edges',
  tags: ['edges', 'layerGradient', 'gradient', 'stops'],
  docs: [
    `${DOCS}/how-to/edges/fill-layers.mdx`,
    `${DOCS}/how-to/edges/types-colors.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
