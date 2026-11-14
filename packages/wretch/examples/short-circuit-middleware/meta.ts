// Answer without asking the server: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Answer without asking the server',
  summary:
    'A middleware does not have to pass the request on. This one never calls next() and returns a made-up Response instead, so the call finishes with an answer while nothing travels to the server: the wire stays empty and the server\'s request count stays at 0. Switch the middleware off and the same call makes the trip.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'Response', 'next'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
