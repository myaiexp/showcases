// ky example: a Request instance as input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Passing a ready-made Request',
  summary:
    'Ky accepts a string, a URL or a finished Request as input. A string is combined with prefix and baseUrl, but a Request already carries its full address, so those two options are ignored. The searchParams option still works on it, adding the query to the Request\'s address.',
  section: 'URLs',
  tags: ['Request', 'prefix', 'baseUrl', 'searchParams'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
