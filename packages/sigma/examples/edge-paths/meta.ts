// Sigma.js example: the built-in edge path geometries
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Edge paths: line, curved, S-curve and step',
  summary:
    'Five source/target pairs, each wired with a different built-in path: pathLine, pathCurved, pathCurvedS, pathStep and pathStepCurved, declared in primitives.edges.paths and picked per edge through the path style.',
  section: 'Styling edges',
  tags: ['edges', 'paths', 'primitives', 'curved'],
  docs: [
    `${DOCS}/how-to/edges/types-colors.mdx`,
    `${DOCS}/reference/primitives-schema.md`,
    `${DOCS}/reference/style-properties.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
