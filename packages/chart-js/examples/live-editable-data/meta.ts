// Chart.js example: bar chart whose months are added, removed and edited
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live, editable data',
  summary:
    'A sales chart that changes while you watch: add a month, remove one, or drag the last bar. Chart.js animates every change; the code only edits the numbers and calls update().',
  section: 'Developers',
  tags: ['update', 'bar', 'data', 'animation'],
  docs: ['repo/docs/developers/updates.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-06-14',
});
