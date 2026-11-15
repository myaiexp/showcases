// --at(a) returns two numbers for @m points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: a function that gives a point",
  summary: "A body can give both numbers of a point from one argument. --at(a): $(cos(a)) $(sin(a)) is a point on the unit circle, and points: @m(6, $at($(n * π / 3))) lists six of them, which is a hexagon.",
  section: "Values",
  tags: ["--name()","$name()","@m","@svg","polygon"],
  docs: ["pages/css-doodle-com/reference/function-define.md","pages/css-doodle-com/reference/function-svg.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
