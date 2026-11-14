// Client errors are no longer retried: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Client errors are no longer retried',
  summary:
    'Moving from wretch 2 to 3 changed what retry() does with a "404 Not Found": version 2 retried every failure, version 3 hands a client error straight to your handler because asking again cannot fix a wrong request. Both clients ask for the same missing post at the same time. One bar for the new default, a row of bars for the old behaviour, which you can restore with a one-line until function.',
  section: 'Migrating from v2',
  tags: ['retry', 'until', 'notFound', 'middlewares'],
  docs: ['repo/MIGRATION_V2_V3.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
