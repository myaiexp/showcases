// ky example: before-request-errors-fatal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRequest: an error stops everything',
  summary:
    'Ky retries failed requests, but a mistake inside your own beforeRequest hook is not a flaky network: nothing is worth retrying. If the hook throws, nothing is sent and the error goes straight to your code.',
  section: 'Hooks',
  tags: ['beforeRequest', 'throw', 'retry'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
