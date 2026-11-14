// Papa Parse example: dynamicTyping as an object, one setting per column
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Type some columns, not others',
  summary:
    'Postcodes look like numbers, but 00100 is not 100. Give dynamicTyping an object keyed by column name and only those columns are converted, so prices become numbers while postcodes keep their leading zeros.',
  section: 'Parse config',
  tags: ['dynamicTyping', 'header', 'leading zeros'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
