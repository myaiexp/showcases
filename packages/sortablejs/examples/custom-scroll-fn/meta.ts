// Sortable.js example: replacing the built-in scrolling with your own function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll with your own function',
  summary:
    'An agenda with a hand-drawn scrollbar. Instead of letting Sortable scroll, a scrollFn receives the distance for each step, scrolls three times as far and slides the custom thumb along.',
  section: 'AutoScroll',
  tags: ['scrollFn', 'scroll', 'forceAutoScrollFallback', 'scrollSpeed'],
  docs: ['repo/plugins/AutoScroll/README.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
