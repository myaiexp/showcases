// Vizzu example: unit on a measure series, shown with the measure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Measure unit',
  summary:
    'A measure series can carry a unit string. Vizzu appends it to the axis labels and to the value labels it prints for that measure (60 k, 62 k), but not to the axis title, which stays the series name.',
  section: 'Data',
  tags: ['data', 'unit', 'measure'],
  docs: ['repo/src/apps/weblib/typeschema-api/data.yaml', 'repo/docs/tutorial/data.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
