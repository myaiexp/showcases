// ky example: ky.query
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Search with a body: ky.query',
  summary:
    'A search with many filters does not fit in a web address, so it has to travel in the body, which usually means a POST. The QUERY method does the same job but promises it only reads, so Ky treats it like a GET: if the server hiccups, Ky safely tries again. A POST with the same body is not repeated.',
  section: 'Requests',
  tags: ['ky.query', 'QUERY', 'retry', 'json'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
