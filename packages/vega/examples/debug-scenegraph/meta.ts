// vega example: Debugging: Scenegraph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Debugging: Walking the Scenegraph',
  summary:
    'view.scenegraph().root walked from the top: the group, its axis and rect marks with item counts and the first bar\'s x, y, size and backing datum, printed beside a chart whose bar count you change.',
  section: 'Debugging',
  tags: ['debugging.scenegraph', 'view.scenegraph', 'signal.bind'],
  docs: ['repo/docs/docs/api/debugging.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
