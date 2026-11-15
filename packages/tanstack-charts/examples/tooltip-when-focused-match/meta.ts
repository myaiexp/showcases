// tanstack-charts example: whenFocused match modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'whenFocused match modes',
  summary:
    'whenFocused reveals only the part of an authored mark that matches the focus. The match option decides what counts: the primary point, the whole focus group, the same key, the same x, the same y or the same series. Pick one and hover a point to see which dots light up.',
  section: 'Tooltips and Focus',
  tags: ['whenFocused', 'match', 'focus', 'group-x', 'dot'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
