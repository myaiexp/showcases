// Papa Parse example: European 1.234,56 numbers, transform + typing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'European number formats',
  summary:
    'Numbers written 1.234,56 stay text under dynamicTyping, because a decimal literal uses a dot. The docs say to swap commas and dots first: transform runs before dynamicTyping, so it can rewrite the value into one Papa then converts.',
  section: 'Parse config',
  tags: ['transform', 'dynamicTyping', 'delimiter', 'decimal comma'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
