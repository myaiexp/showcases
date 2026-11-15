// tanstack-charts example: Continuous legend: label, width, format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous legend: label, width, format',
  summary:
    'A continuous color scale gets a sampled ramp as its legend. label titles it, width sets the preferred size, and format turns the numeric endpoints into text such as 1.2k requests. The scale is a D3 sequential factory, so the chart infers the extent from the color channel.',
  section: 'Legends and Color',
  tags: ['colorLegend', 'scaleSequential', 'format', 'width', 'label'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
