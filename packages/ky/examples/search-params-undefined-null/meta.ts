// ky example: undefined and null in searchParams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'undefined removes, null says "null"',
  summary:
    'When a filter is cleared, you want it gone from the address, not left over from an old link. In a searchParams object, undefined deletes that parameter (even one already in the address you passed), while null is not "nothing": it is sent as the word null. Try each on a link that already holds a filter.',
  section: 'URLs',
  tags: ['searchParams', 'undefined', 'null'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
