// Tippy.js example: Tips created only when needed on a seat map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tips created only when needed',
  summary:
    'A seat map has 500 seats, and every one shows its row and seat on hover. A counter shows that only the seats you have touched own a tip, because the map creates each one on first hover.',
  section: 'Addons',
  tags: ['delegate', 'target', 'onCreate', 'destroy()'],
  docs: ['repo/website/src/pages/v6/addons.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
