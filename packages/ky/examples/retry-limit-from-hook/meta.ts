// ky example: lowering retry.limit from an afterResponse hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stop retrying from a hook',
  summary:
    'Sometimes the answer itself tells you retrying is pointless, such as a notice that the shop is closed for maintenance. An afterResponse hook can read it and lower the retry limit on the spot, so Ky stops early instead of working through every try.',
  section: 'Retry',
  tags: ['retry.limit', 'afterResponse', 'hooks', 'options'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
