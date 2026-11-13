// Automatic retries example metadata for the ky package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic retries',
  summary:
    'A simulated server returns 503 twice before succeeding. ky retries with backoff and the beforeRetry hook lets you watch it happen. No real network involved.',
  section: 'Basics',
  tags: ['retry', 'hooks', 'fetch'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
