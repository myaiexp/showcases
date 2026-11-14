// observable-plot example: Scales: year-like tick formatting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: year-like tick formatting',
  summary:
    'Integer ticks between 1,500 and 2,500 are formatted as years without separators, on a linear or band scale; tickFormat \"d\" or \",d\" overrides it.',
  section: 'Scales',
  tags: ['tickFormat', 'band', 'linear', 'x'],
  docs: ['repo/docs/features/scales.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
