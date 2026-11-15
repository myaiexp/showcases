// @svg-filter(<filter>...</filter>) is used as written
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: a whole <filter> as XML",
  summary: "The XML of a whole filter works as well, for anyone who already has one. A blur and a turbulence displacement are written as plain markup and applied to the disc.",
  section: "SVG",
  tags: ["@svg-filter","XML","feGaussianBlur"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
