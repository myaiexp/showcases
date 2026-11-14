// ky example: the parts of an HTTPError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Inside an HTTPError',
  summary:
    'When a request fails you often need more than "it failed": which status, which headers, what was sent. An HTTPError keeps the answer in error.response, the request in error.request and the normalized settings in error.options, so your catch block can report or react without extra bookkeeping.',
  section: 'HTTP errors',
  tags: ['HTTPError', 'error.response', 'error.request', 'error.options', 'headers'],
  docs: ['repo/readme.md', 'repo/source/errors/HTTPError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
