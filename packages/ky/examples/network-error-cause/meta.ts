// ky example: NetworkError and its cause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When the connection drops',
  summary:
    'When the internet goes away, fetch only says "TypeError: Failed to fetch", which looks the same as a bug in your code. Ky recognises it, throws a NetworkError that knows which request failed, and keeps the browser\'s own error on error.cause. For safe requests it also tries again first.',
  section: 'Error classes',
  tags: ['NetworkError', 'isNetworkError', 'cause', 'TypeError', 'offline'],
  docs: ['repo/readme.md', 'repo/source/errors/NetworkError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
