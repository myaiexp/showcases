// 45deg, .25turn and a bare number rotate a gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG gradient: ways to write the angle",
  summary: "The first argument can be an angle in deg or turn, or a bare number in degrees; there is no CSS \"to right\". Each variant fills the same square with another spelling, so 45deg and 45 match.",
  section: "SVG",
  tags: ["@linearGradient","angle"],
  docs: ["pages/css-doodle-com/reference/function-svg-gradient.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
