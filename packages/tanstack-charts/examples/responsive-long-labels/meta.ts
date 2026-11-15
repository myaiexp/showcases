// tanstack-charts example: Margins follow long labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Margins follow long labels',
  summary:
    'A horizontal bar chart with long category names and no margin option. The solver measures the labels and reserves exactly the room they need, so the plot gives up width as the box narrows. The readout shows the left margin it picked.',
  section: 'Responsive Charts',
  tags: ['margin', 'barX', 'scaleBand', 'scene.margin'],
  docs: ['repo/docs/guides/responsive-charts.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
