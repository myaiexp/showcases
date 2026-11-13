// Sigma.js example: matchData/cases rules that branch styles on a categorical attribute
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Rule-level match',
  summary:
    'A base rule plus a matchData/cases rule that maps the type attribute to shapes and colors for nodes and to colors and arrowheads for edges. Flipping the attribute switches the matched case.',
  section: 'Concepts',
  tags: ['matchData', 'cases', 'shapes', 'extremities'],
  docs: [
    `${DOCS}/concepts/styles-and-primitives.mdx`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/primitives-schema.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
