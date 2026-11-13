// Sigma.js example: mapping node colour and size to graph attributes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Node colours and sizes from attributes',
  summary:
    'Styles read node color and size straight from attributes, through a categorical dictionary and a numerical range, or from one fixed value. Switch between the three recipes.',
  section: 'Styling nodes',
  tags: ['styles', 'color', 'size', 'attribute binding'],
  docs: [
    `${DOCS}/how-to/nodes/colors-sizes.mdx`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/state-flags.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
