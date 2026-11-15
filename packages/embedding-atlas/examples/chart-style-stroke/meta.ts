// embedding-atlas example: strokeColor, strokeWidth, strokeCap, strokeJoin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke style of a line",
  summary:
    "A line of mean score over eight word bins, restyled through the layer style: a thick butt-capped line, round caps and joins, square caps with a miter join, a bevel join, and a half-transparent stroke.",
  section: "Charts",
  tags: ['style', 'strokeColor', 'strokeWidth', 'strokeOpacity', 'strokeCap', 'strokeJoin', 'mark: line'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
