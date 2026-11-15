// embedding-atlas example: a bar layer with orientation horizontal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Horizontal bars",
  summary:
    "orientation: \"horizontal\" on a bar layer puts the category on y and the value on x. The chart counts documents per source and keeps the crossfilter layer, so a saved brush on the score histogram redraws the bright bars.",
  section: "Charts",
  tags: ['orientation', 'mark: bar', 'filter: $filter', 'chartStates'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
