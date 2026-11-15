// $deg, $turn, $px and $% append a unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: a unit after the sign",
  summary: "A unit written after $ is appended to the result. Twelve thin lines are rotated around their left end by an angle computed per cell, in degrees or turns. A unit inside the expression would read as 0, so it goes outside.",
  section: "Values",
  tags: ["$deg","$turn","$px","$%","rotate"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
