// Retry until the answer is right: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry until the answer is right',
  summary:
    'A job takes a while to finish, and the server answers 200 "working" until it is done. By default retry() would stop at the first 200. With an until function that looks inside the answer, wretch keeps asking until the job says "done", and the panel ticks off each check.',
  section: 'Middlewares',
  tags: ['retry', 'until', 'polling', 'middlewares'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
