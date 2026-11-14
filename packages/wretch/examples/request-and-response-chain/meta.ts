// The two halves of a chain: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The two halves of a chain',
  summary:
    'A wretch chain has two halves: first you describe the request (headers, query, body) and an HTTP method sends it; then you say what to do with the answer (catchers, then a reader). Three rows of labels light up in that order while the server answers 201, 400 or 401.',
  section: 'Usage',
  tags: ['chaining', 'headers', 'query', 'json', 'post', 'badRequest', 'unauthorized', 'QueryStringAddon'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
