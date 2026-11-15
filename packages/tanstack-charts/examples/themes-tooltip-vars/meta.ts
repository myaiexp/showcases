// tanstack-charts example: Tooltip chrome from CSS variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip chrome from CSS variables',
  summary:
    'The built-in tooltip reads --ts-chart-tooltip-background, -color, -border, -border-radius and -shadow from the chart container. These variables avoid specificity fights with its positioning styles. A pretend pointer sweeps the chart so the tooltip is visible.',
  section: 'Themes and Styling',
  tags: ['tooltip', '--ts-chart-tooltip-background', '--ts-chart-tooltip-border-radius', '--ts-chart-tooltip-shadow'],
  docs: ['repo/docs/guides/themes-and-styling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
