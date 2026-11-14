// Tippy.js example: a hand-made bubble that updates itself via render's onUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Updating a hand-made box',
  summary:
    'An upload bubble built from scratch shows a progress bar that fills while the file goes up. Each setContent() call reaches your own onUpdate function, which compares old and new and redraws only what changed.',
  section: 'Headless Tippy',
  tags: ['tippy.js/headless', 'render', 'onUpdate', 'setContent()', 'setProps()', 'trigger'],
  docs: ['repo/website/src/pages/v6/headless-tippy.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
