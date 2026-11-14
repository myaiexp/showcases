// ky example: ky-retry-fallback-endpoint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry at a backup server',
  summary:
    'When the main server says it cannot help, a second server may. Return ky.retry with a new Request from an afterResponse hook and Ky repeats the call at the backup address. Build that Request yourself: anything you copy over, such as a login header, goes to the other server too.',
  section: 'Forced retries',
  tags: ['ky.retry', 'request', 'fallback', 'afterResponse'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
