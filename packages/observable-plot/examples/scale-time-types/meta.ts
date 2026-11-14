// observable-plot example: Scales: UTC, time and date domains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: UTC, time and date domains',
  summary:
    'Date domains default to a UTC scale; type utc reads epoch milliseconds and type time uses local-time ticks. One state shows a long date domain.',
  section: 'Scales',
  tags: ['utc', 'time', 'domain', 'x'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
