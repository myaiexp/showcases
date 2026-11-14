// observable-plot example: Contour: stroked and filled volcano
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Contour: stroked and filled volcano",
  summary: "Contours of the Maungawhau volcano grid: with only width and height they are isolines to stroke; setting fill to Plot.identity fills them and colours them by elevation, with a legend.",
  section: 'Mark: Contour',
  tags: ['contour', 'width', 'height', 'fill', 'identity', 'stroke', 'legend'],
  docs: ['repo/docs/marks/contour.md', 'repo/docs/data/volcano.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
