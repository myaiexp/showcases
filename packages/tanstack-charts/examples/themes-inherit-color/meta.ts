// tanstack-charts example: Chart follows the container color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart follows the container color',
  summary:
    'No theme is set. Text, axes and grid lines are drawn in currentColor and the background is transparent, so changing the container color and background restyles the chart with plain CSS. The chart definition and the mounted host are never touched.',
  section: 'Themes and Styling',
  tags: ['currentColor', 'theme', 'CSS color'],
  docs: ['repo/docs/guides/themes-and-styling.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
