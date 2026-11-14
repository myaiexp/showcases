// ky example: plain-language messages from Ky's type guards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Error messages a visitor can understand',
  summary:
    'An error like "Request failed with status code 503" means nothing to a visitor. Ky\'s type guards (isNetworkError, isTimeoutError, isHTTPError, isResponseSizeError) let one small function sort every failure into a plain sentence that says what happened and what to do next.',
  section: 'Error classes',
  tags: ['isHTTPError', 'isNetworkError', 'isTimeoutError', 'isResponseSizeError', 'type guards', 'user messages'],
  docs: ['repo/readme.md', 'repo/source/errors/HTTPError.ts', 'repo/source/errors/NetworkError.ts', 'repo/source/errors/TimeoutError.ts', 'repo/source/errors/ResponseSizeError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
