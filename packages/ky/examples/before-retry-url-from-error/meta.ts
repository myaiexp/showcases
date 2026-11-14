// ky example: before-retry-url-from-error
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRetry: use what the error says',
  summary:
    'When a request fails, the server\'s answer often explains what to do next. Ky puts that answer on the error as error.data, and a beforeRetry hook can use it to change the retry: here the server hands out a job number, and the retry must quote it in its address.',
  section: 'Hooks',
  tags: ['beforeRetry', 'error.data', 'HTTPError', 'URL'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
