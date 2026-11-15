// | @svg-filter after @grid is a backdrop filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: a backdrop over the grid",
  summary: "With the | modifier of @grid the filter becomes a backdrop filter over the whole grid, so the background behind the gapped, shrunken cells is displaced. The variants change the noise.",
  section: "SVG",
  tags: ["@svg-filter","@grid","backdrop-filter","|"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
