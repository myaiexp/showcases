// Sigma.js example: three ways to colour edges
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Edge colours',
  summary:
    'The same ring graph coloured from an edge attribute through styles, from an attribute read by layerPlain, and from the source or target node colour, which edges follow live.',
  section: 'Styling edges',
  tags: ['edges', 'color', 'layerPlain', 'node reference'],
  docs: [
    `${DOCS}/how-to/edges/types-colors.mdx`,
    `${DOCS}/how-to/edges/fill-layers.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
