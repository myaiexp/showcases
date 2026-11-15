// region: sets how far a filter draws outside
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: the region it may draw in",
  summary: "Displacement can move pixels outside the element, so a filter gets a region around it, 20% on every side by default once a short name is used. region: x [y] / width [height] changes it; a tight region clips the ragged edge, a wide one lets it spill.",
  section: "SVG",
  tags: ["@svg-filter","region","scale"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
