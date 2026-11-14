// observable-plot example: Line: single line with redundant colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: single line with redundant colour',
  summary:
    'Apple closes drawn as one line whose colour follows the price. When stroke and y are strictly equal, z defaults to null, so the data stays a single series.',
  section: 'Mark: Line',
  tags: ['lineY', 'stroke', 'z'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
