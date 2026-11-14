// Choose how waits grow: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Choose how waits grow',
  summary:
    'Three identical clients meet the same server, busy for three answers. They differ only in delayRamp: the default waits one step longer each time (linear), one waits the same each time (constant), one doubles. Three timelines run side by side so the gaps can be compared at a glance.',
  section: 'Middlewares',
  tags: ['retry', 'delayRamp', 'delayTimer', 'middlewares'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
