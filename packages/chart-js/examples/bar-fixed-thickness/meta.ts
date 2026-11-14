// Chart.js example: Fixed bar thickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fixed bar thickness',
  summary:
    'Survey scores on unevenly spaced weeks, with bar width set in pixels by barThickness, filled out by \'flex\', or capped by maxBarThickness. Handy when the automatic width is too fat or too thin.',
  section: 'Chart types',
  tags: ['bar', 'barThickness', 'maxBarThickness', 'width'],
  docs: ['repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
