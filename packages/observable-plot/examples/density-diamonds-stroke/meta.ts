// observable-plot example: Density: diamonds on log scales
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: diamonds on log scales",
  summary: "Density contours of diamond carat against price on log-log axes, stroked with the density keyword so the colour shows how concentrated each contour is. Cards draw every 20th diamond.",
  section: 'Mark: Density',
  tags: ['density', 'stroke', 'log', 'grid', 'inset'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/diamonds.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
