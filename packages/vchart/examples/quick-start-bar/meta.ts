// vchart example: Quick start: a bar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: a bar chart',
  summary:
    'The Quick Start chart: a spec with one data entry, type bar and the x and y fields, passed to new VChart and drawn with renderSync. Every two seconds updateData replaces the values and the bars animate to their new heights.',
  section: 'Quick Start',
  tags: ['new VChart', 'renderSync', 'spec', 'bar', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Getting_Started.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
