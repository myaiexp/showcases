// 300 circles placed by @n and $()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SVG: functions inside, a Fibonacci spiral",
  summary: "Functions work inside @svg. Each of 300 circles takes its position, size and hue from @n, with the golden ratio .618 and the angle 2π·n·.618, which forms a sunflower spiral. The whole tile turns slowly.",
  section: "SVG",
  tags: ["@svg","circle*300","@n","$()","@sqrt","@sin"],
  docs: ["pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
