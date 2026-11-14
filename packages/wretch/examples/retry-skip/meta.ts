// Never retry some requests: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Never retry some requests',
  summary:
    'Retrying a read is harmless, but retrying "send this order" could place it twice. The skip option names the requests retry() must leave alone. Here every non-GET request is skipped: the GET is retried until it works, the POST is sent exactly once even though it failed.',
  section: 'Middlewares',
  tags: ['retry', 'skip', 'middlewares'],
  docs: ['repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
