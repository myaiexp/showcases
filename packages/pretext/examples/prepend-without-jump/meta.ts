// Pretext example: re-anchor scroll position by predicted heights when older messages are prepended
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prepend without layout shift',
  summary:
    'Older messages are prepended to a feed. Their heights come from layout() before they exist in the page, so scrollTop moves by exactly that much and the message you were reading stays put.',
  section: 'Measure height',
  tags: ['scroll', 'layout shift', 'prepend', 'feed'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
