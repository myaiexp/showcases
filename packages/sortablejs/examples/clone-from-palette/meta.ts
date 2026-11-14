// Sortable.js example: a block palette that hands out copies to a page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build a page from a block palette',
  summary:
    'A page builder: drag Header, Text or Image blocks from the palette onto the page. The palette keeps every block, so you can use each one as often as you like.',
  section: 'Groups',
  tags: ['group', 'pull: "clone"', 'put: false', 'sort: false'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
