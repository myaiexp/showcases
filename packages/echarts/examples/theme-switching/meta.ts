// echarts example: Dynamic theme switching
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dynamic theme switching',
  summary:
    'chart.setTheme swaps a running chart between the built-in default and dark themes and a theme registered with echarts.registerTheme, and can follow prefers-color-scheme.',
  section: "What's New in 6",
  tags: ['setTheme', 'registerTheme', 'dark mode', 'notMerge'],
  docs: [
    'repo/contents/en/basics/release-note/v6-feature.md',
    'repo/en/api/echarts-instance.md',
    'repo/en/api/echarts.md',
    'repo/contents/en/concepts/style.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
