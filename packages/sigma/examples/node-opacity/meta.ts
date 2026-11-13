// Sigma.js example: the opacity style property on nodes and edges
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Node opacity and alpha blending',
  summary:
    'The `opacity` style property fades nodes and edges from opaque to transparent. Large overlapping nodes show how they blend; a slider (or a pulse in the card) sets the attribute it reads.',
  section: 'Styling nodes',
  tags: ['opacity', 'alpha blending', 'styles'],
  docs: [`${DOCS}/how-to/nodes/colors-sizes.mdx`, `${DOCS}/reference/style-properties.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
