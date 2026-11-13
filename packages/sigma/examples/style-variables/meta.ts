// Sigma.js example: custom style variables declared in primitives and bound in styles
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Custom style variables',
  summary:
    'Declares borderSize and borderColor as primitives variables, feeds them to a border layer, then binds them in styles with an attribute binding and an inline hover conditional.',
  section: 'Concepts',
  tags: ['primitives', 'variables', 'layerBorder', 'styles'],
  docs: [
    `${DOCS}/concepts/styles-and-primitives.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
