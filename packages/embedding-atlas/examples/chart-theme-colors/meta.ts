// embedding-atlas example: chartTheme mark, category, grid, label colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart theme: mark and category colors",
  summary:
    "chartTheme restyles every chart of an atlas. The variants set markColor with its faded twin, a custom categoryColors palette and otherColor for the legend, and grid and label colors with a larger label font.",
  section: "Charts",
  tags: ['chartTheme', 'markColor', 'markColorFade', 'categoryColors', 'otherColor', 'gridColor', 'labelColor', 'labelFontSize', 'ChartThemeConfig'],
  docs: [
    'repo/packages/viewer/src/charts/common/theme.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
