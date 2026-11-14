// ky example: searchParams as an object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Build the address from an object',
  summary:
    'Filters on a page travel in the address, as in ?maxPrice=100&inStock=true, and gluing that text together by hand invites typos. Give Ky an object in searchParams and it writes the query for you, numbers and booleans included. Change the filters and see the address the server got.',
  section: 'URLs',
  tags: ['searchParams', 'query string', 'ky.get'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
