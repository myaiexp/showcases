// embedding-atlas example: scale.color.range as an interpolate scheme name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color scale: named schemes",
  summary:
    "For a quantitative color scale, range can be the name of a predefined scheme instead of a list of colors. The same words by score heatmap is painted with viridis, magma, rdylgn and blues.",
  section: "Charts",
  tags: ['scale', 'color', 'range', 'viridis', 'magma', 'interpolate'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/charts/common/theme.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
