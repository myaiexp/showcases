// Sigma.js example: numerical attribute bindings with each named easing and a custom one
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Numerical bindings and easings',
  summary:
    'Eleven rows of nodes whose size is a numerical binding (min, max, minValue, maxValue) on a score attribute. Each row uses one named easing, plus a custom (t) => number, while a wave sweeps through the scores.',
  section: 'Reference',
  tags: ['numerical binding', 'easing', 'matchData', 'size'],
  docs: [`${DOCS}/reference/style-value-types.md`, `${DOCS}/concepts/styles-and-primitives.mdx`],
  provenance: 'pure',
  added: '2026-11-13',
});
