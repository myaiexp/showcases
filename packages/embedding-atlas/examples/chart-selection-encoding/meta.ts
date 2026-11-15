// embedding-atlas example: selection.brush.encoding x, y, xy and a saved brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brush encoding: x, y and xy",
  summary:
    "The selection key of a spec declares a brush and which axes it covers. On a words by score heatmap, \"x\" brushes a column band, \"y\" a row band and \"xy\" a rectangle; the chartStates entry under the same key presets it, and the count plot narrows to match.",
  section: "Charts",
  tags: ['selection', 'encoding: x', 'encoding: y', 'encoding: xy', 'chartStates', 'ChartState'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
    'repo/packages/viewer/src/api.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
