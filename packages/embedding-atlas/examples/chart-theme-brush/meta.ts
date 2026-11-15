// embedding-atlas example: chartTheme brushFill, brushBorder, interpolate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart theme: brush and interpolate",
  summary:
    "brushFill, brushBorder and brushBorderBack style the selection rectangle (a brush is preset through chartStates), and interpolate sets the default scheme of continuous color scales, here viridis and cividis on the heatmap.",
  section: "Charts",
  tags: ['chartTheme', 'brushFill', 'brushBorder', 'brushBorderBack', 'interpolate', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/common/theme.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
