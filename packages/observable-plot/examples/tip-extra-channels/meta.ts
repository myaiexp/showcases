// observable-plot example: Tip: extra channels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tip: extra channels',
  summary:
    'The channels option registers name and sport so the tip shows them next to x, y and stroke; the toggle removes them.',
  section: 'Mark: Tip',
  tags: ['tip', 'channels', 'dot'],
  docs: ['repo/docs/marks/tip.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
