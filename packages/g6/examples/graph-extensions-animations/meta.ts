// g6 example: Built-in extensions: animation types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in extensions: animation types',
  summary:
    'The built-in animation names used per stage: fade or translate for nodes, fade or path-in for edges. A button removes and re-adds a node.',
  section: 'Graph',
  tags: ['node.animation', 'edge.animation', 'fade', 'translate', 'path-in', 'path-out'],
  docs: [
    'repo/packages/site/docs/manual/graph/extensions.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
