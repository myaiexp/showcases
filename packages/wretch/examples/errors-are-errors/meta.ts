// A 404 is a failure, not a success: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A 404 is a failure, not a success',
  summary:
    'When a server answers "not found", plain fetch still counts the request as a success and leaves the checking to you. wretch treats any error status as a failure and sends it to the handler named after it. The server cycles through 200, 404, 401, 418 and 500 so you can see both columns react.',
  section: 'Motivation',
  tags: ['fetch', 'notFound', 'unauthorized', 'error', 'internalError'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
