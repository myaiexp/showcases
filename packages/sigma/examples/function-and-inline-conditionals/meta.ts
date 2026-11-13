// Sigma.js example: function values and the three inline conditional forms
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Function values and inline conditionals',
  summary:
    'One node style combining a function value (hue from score), inline whenState, whenData and when conditionals. Scores drift on a timer and hovering reshapes size and opacity.',
  section: 'Reference',
  tags: ['function value', 'inline conditional', 'whenState', 'whenData'],
  docs: [`${DOCS}/reference/style-value-types.md`, `${DOCS}/concepts/styles-and-primitives.mdx`],
  provenance: 'pure',
  added: '2026-11-13',
});
