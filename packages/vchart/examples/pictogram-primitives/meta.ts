// vchart example: Pictogram: SVG primitives tied to data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pictogram: SVG primitives tied to data",
  summary:
    "VChart.registerSVG takes an inline SVG string; a pictogram series ties each element's name attribute to a data row through nameField and paints it from a linear colour scale. The inline SVG uses rect, circle, ellipse, line, polyline, polygon, path and text.",
  section: "Word Cloud and Pictogram",
  tags: ['pictogram','registerSVG','registerPictogramChart','nameField','defaultFillColor'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pictogram.md',
    'repo/docs/assets/option/en/series/pictogram.md',
    'repo/docs/assets/option/en/chart/pictogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
