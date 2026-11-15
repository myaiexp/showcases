// AntV Infographic example: Syntax: streaming render, append and re-render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Syntax: streaming render, append and re-render',
  summary:
    'The streaming section keeps a buffer, appends every new chunk of syntax and calls render() with the whole buffer. Here the text arrives in small slices, even mid-line, and the infographic grows as far as it can be read; then it loops.',
  section: 'Infographic syntax',
  tags: ['render', 'streaming', 'buffer', 'list-row-horizontal-icon-arrow'],
  docs: [
    'repo/site/src/content/learn/infographic-syntax.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
