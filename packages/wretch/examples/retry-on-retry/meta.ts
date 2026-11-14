// Change the request between tries: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Change the request between tries',
  summary:
    'The main server is down, but a backup server exists. onRetry runs before each new try and may return a different address and different options: here it switches to the backup path and adds an X-Attempt header. The log lists what each try actually carried.',
  section: 'Middlewares',
  tags: ['retry', 'onRetry', 'middlewares'],
  docs: ['repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
