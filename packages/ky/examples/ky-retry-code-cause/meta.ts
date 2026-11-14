// ky example: ky-retry-code-cause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Forced retries leave a label',
  summary:
    'When you force a retry, you can attach a short code and the original problem. Later, a beforeRetry hook sees them on the error, so logs can say not just that something was retried but why. Change the code and watch it come through.',
  section: 'Forced retries',
  tags: ['ky.retry', 'ForceRetryError', 'code', 'cause', 'beforeRetry'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
