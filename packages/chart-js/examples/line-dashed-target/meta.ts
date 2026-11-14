// Chart.js example: A dashed target line under real data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A dashed target line under real data',
  summary:
    'Weekly running distance against a flat dashed target line. borderDash sets dash and gap lengths and borderDashOffset slides the pattern along.',
  section: 'Chart types',
  tags: ['line', 'borderDash', 'borderDashOffset', 'target'],
  docs: ['repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
