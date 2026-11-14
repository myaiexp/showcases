// marked example: use() called again and again
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'use() called again and again',
  summary:
    'Press Render: on the left use() is called inside the render function, so each press adds the same extension once more and the exclamation mark grows. On the right use() ran once, so the output never changes. Each runs on its own instance.',
  section: 'Marked instance',
  tags: ['marked.use', 'walkTokens', 'new Marked', 'warning'],
  docs: ['repo/docs/USING_PRO.md', 'repo/docs/USING_ADVANCED.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
