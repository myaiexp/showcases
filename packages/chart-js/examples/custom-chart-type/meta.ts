// Chart.js example: A custom chart type built on bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom chart type built on bar',
  summary:
    'A new controller extends BarController, draws a crown on the tallest bar after the normal bars, and is registered as its own chart type id.',
  section: 'Developers',
  tags: ['BarController', 'custom chart', 'register', 'draw'],
  docs: ['repo/docs/developers/charts.md', 'repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
