// Server errors retry, client errors don't: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Server errors retry, client errors don't",
  summary:
    'By default retry() repeats a request only when the server is at fault (5xx). A 404 or 400 means the request itself was wrong, so asking again would change nothing: it is handed straight to your handler as one bar. A 503 is retried several times first.',
  section: 'Middlewares',
  tags: ['retry', 'until', 'notFound', 'badRequest', 'middlewares'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
