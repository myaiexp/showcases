// feTurbulence and feDisplacementMap as a body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: written out in full",
  summary: "The body takes the children of a <filter> in the SVG syntax. Here feTurbulence has a stretched baseFrequency of .01 by .5, so the displacement streaks sideways. The variants stretch it the other way or round.",
  section: "SVG",
  tags: ["@svg-filter","feTurbulence","feDisplacementMap","baseFrequency"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
