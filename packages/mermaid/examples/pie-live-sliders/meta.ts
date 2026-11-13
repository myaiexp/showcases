// mermaid example: Pie chart driven by sliders
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie chart driven by sliders',
  summary:
    'Each slice has a slider; moving one rebuilds the definition and re-renders the pie. `showData` prints the raw values in the legend. The preview drifts the values on a timer.',
  section: 'Pie Chart',
  tags: ['pie', 'showData', 'sliders', 'live'],
  docs: ['repo/packages/mermaid/src/docs/syntax/pie.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
