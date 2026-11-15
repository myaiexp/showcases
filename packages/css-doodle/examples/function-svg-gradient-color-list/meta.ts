// One comma-list argument is split into stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: a list in a variable",
  summary: "One argument that holds a comma list, such as $colors after --colors: #000, #e6437d, #ebbf4d, is split into stops. Changing the property changes every gradient that reads it. Variants hold other lists.",
  section: "SVG",
  tags: ["@linearGradient","@radialGradient","$colors","--colors"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
