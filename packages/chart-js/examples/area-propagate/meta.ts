// Chart.js example: Filling when a dataset is hidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Filling when a dataset is hidden',
  summary:
    'Four plans filled down to the plan before. Hide one and the plugins.filler.propagate option decides if the next area stretches on to the next visible one or vanishes.',
  section: 'Chart types',
  tags: ['area', 'fill', 'filler', 'propagate', 'hidden'],
  docs: ['repo/docs/charts/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
