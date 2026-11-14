// Tippy.js example: a stock tip whose price updates while it is open
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A tip that updates while open',
  summary:
    'Hover a stock symbol and its tip shows a price that keeps changing, once a second. The update timer starts when the tip opens and stops when it has closed, so nothing runs for tips nobody is looking at.',
  section: 'Methods',
  tags: ['setContent()', 'onShow', 'onHidden'],
  docs: ['repo/website/src/pages/v6/methods.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
