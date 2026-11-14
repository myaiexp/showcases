// Handle responses by status example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Handle responses by status',
  summary:
    'The same request, and the server answers with a different status each time. Wretch hands each failure to the helper named after it (.notFound(), .unauthorized()…) and only a success reaches .json().',
  section: 'Catchers',
  tags: ['badRequest', 'unauthorized', 'forbidden', 'notFound', 'timeout', 'internalError', 'json'],
  docs: ['repo/README.md', 'repo/src/types.ts', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-06-14',
});
