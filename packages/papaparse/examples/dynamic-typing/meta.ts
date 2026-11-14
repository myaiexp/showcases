// Papa Parse example: dynamicTyping turns text into numbers and booleans
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numbers that add up',
  summary:
    'Everything Papa reads is text until you ask otherwise. Add up a column of quantities and you get the digits glued together. With dynamicTyping the same column is real numbers and the sum is right.',
  section: 'Parse config',
  tags: ['dynamicTyping', 'type conversion'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
