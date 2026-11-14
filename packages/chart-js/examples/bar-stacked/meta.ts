// Chart.js example: Stacked bars: parts of a total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stacked bars: parts of a total',
  summary:
    'Each month\'s electricity split into solar, wind, hydro and gas, stacked so the bar height is the total. Setting stacked: true on both scales stacks them; turn it off and the parts sit side by side.',
  section: 'Chart types',
  tags: ['bar', 'stacked', 'scales'],
  docs: ['repo/docs/charts/bar.md', 'repo/docs/axes/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
