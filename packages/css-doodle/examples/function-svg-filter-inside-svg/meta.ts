// In @svg the filter goes into that SVG's defs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: inside an @svg",
  summary: "Used inside @svg, @svg-filter does not add a filter to the component: it goes into that SVG's own <defs> and the attribute references it. Here a circle in the SVG gets a ragged outline from a noise filter.",
  section: "SVG",
  tags: ["@svg-filter","@svg","defs"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
