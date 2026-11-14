// Papa Parse example: dynamicTyping as a function that decides per column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Decide per column with a function',
  summary:
    'Order numbers and phone numbers are made of digits but are not quantities: you never add them up, and a phone number loses its leading 0 as a number. Give dynamicTyping a function and it is asked once per column whether to convert it.',
  section: 'Parse config',
  tags: ['dynamicTyping', 'dynamicTyping function', 'header'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
