// vchart example: Pie label guide lines: customShape and spaceWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie label guide lines: customShape and spaceWidth",
  summary: "The guide line between a pie slice and its label can be redrawn with label.line.customShape, which receives the label, its vertices and a path to draw into. spaceWidth and layoutArcGap set the gaps around the text. Selects switch the line shape.",
  section: "Option: Series",
  tags: ["pie.label.line.customShape","spaceWidth","layoutArcGap","line.smooth"],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
