// d2 example: LaTeX plugins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LaTeX plugins',
  summary:
    'Each variant shows a few of the bundled plugins in a grid: `mhchem` for chemical equations, `cancel` for strike-through terms, `color` for coloured symbols, `physics`, `braket` and `gensymb`.',
  section: 'Text & Code',
  tags: ['latex', 'plugins', 'grid-columns'],
  docs: ['repo/docs/tour/text.md', 'repo/static/d2/latex.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
