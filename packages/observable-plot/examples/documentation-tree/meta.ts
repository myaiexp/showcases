// observable-plot example: The documentation as a tree
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The documentation as a tree',
  summary:
    'What is Plot? closes with its own sidebar drawn by the tree mark: every page becomes a slash-separated path, and the plot height follows the breadth d3.tree computes for it.',
  section: 'Introduction',
  tags: ['tree', 'path', 'treeSort', 'textStroke', 'channels', 'axis: null'],
  docs: ['repo/docs/what-is-plot.md', 'repo/docs/.vitepress/config.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
