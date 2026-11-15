// tanstack-charts example: Interactive legend toggles series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interactive legend toggles series',
  summary:
    'interactiveColorLegend turns the legend into native buttons. The application keeps the visible series in a controlled signal, and the legend proposes the next full array in color-domain order. Hidden series keep their color and do not change the axis domains, because filtering happens after scale resolution.',
  section: 'Legends and Color',
  tags: ['interactiveColorLegend', 'controlledSignal', 'visible', 'color.domain'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
