// Sigma.js example: rule-level `when` predicate over custom node and graph state
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Conditional node styles',
  summary:
    'A style rule with a `when` predicate greys out every node that is not active, driven by custom node and graph state flags set through setNodeState and setGraphState.',
  section: 'Styling nodes',
  tags: ['styles', 'when', 'state', 'highlight'],
  docs: [
    `${DOCS}/how-to/nodes/colors-sizes.mdx`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/concepts/styles-and-primitives.mdx`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
