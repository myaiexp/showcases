// tanstack-charts example: Builders receive the default theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Builders receive the default theme',
  summary:
    'A responsive builder gets defaultTheme, the platform tokens before the definition theme applies. Here its muted color and second palette entry paint a reference rule and a target marker, so the extra marks match the chart without hard-coded colors.',
  section: 'Themes and Styling',
  tags: ['defineChart', 'chart builder', 'defaultTheme', 'ruleY'],
  docs: [
    'repo/docs/guides/themes-and-styling.md',
    'repo/docs/reference/marks/bar-and-rect.md',
    'repo/docs/reference/marks/rules-links-arrows-vectors-and-ticks.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
