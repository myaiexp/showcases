// blur, erode, dilate and region as declarations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG filter: short names in the body",
  summary: "The short-form names work as declarations in the body: blur, erode and dilate add a primitive each, and frequency with scale adds the noise. Names next to each other form a group that runs dilate, erode and blur before the noise.",
  section: "SVG",
  tags: ["@svg-filter","blur","erode","dilate","frequency","scale"],
  docs: ["pages/css-doodle-com/reference/function-svg-filter.md","repo/docs/languages.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
