// Sigma.js example: node state flags driving conditional styles
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Built-in state flags',
  summary:
    'Every node carries isHovered, isLabelHovered, isHighlighted, isDragged and isHidden, and each gets its own whenState style rule here. Set the flags with setNodeState, or trigger them with the pointer and read them live next to the graph state.',
  section: 'Reference',
  tags: ['state', 'setNodeState', 'whenState', 'styles'],
  docs: [
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/style-properties.md`,
    `${DOCS}/reference/settings.md`,
    `${DOCS}/how-to/interactivity/hover-search.mdx`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
