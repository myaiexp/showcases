// ky example: ky-stop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ky.stop: give up quietly',
  summary:
    'Some requests are only a courtesy, like telling a server a page was viewed. If it fails, retrying is not worth the trouble and an error is not worth showing. Return ky.stop from a beforeRetry hook and Ky stops quietly, handing back undefined instead of an answer.',
  section: 'Forced retries',
  tags: ['ky.stop', 'beforeRetry', 'undefined', 'POST'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
