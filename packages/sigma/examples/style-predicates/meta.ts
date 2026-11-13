// Sigma.js example: whenData, whenState and when predicates in style rules
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Style predicates',
  summary:
    'Four rules, each gated by a different predicate: whenData on an attribute, whenState with the object and string forms, and a when function reading graph state to fade everything but the hovered neighborhood.',
  section: 'Concepts',
  tags: ['whenState', 'whenData', 'when', 'state flags'],
  docs: [`${DOCS}/concepts/styles-and-primitives.mdx`, `${DOCS}/reference/style-value-types.md`, `${DOCS}/reference/state-flags.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
