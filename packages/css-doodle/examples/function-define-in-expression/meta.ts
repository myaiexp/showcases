// --wave(v) drives scale and opacity from @x and @y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Define: a function called inside $()",
  summary: "Inside $() a parameter can be written without a $. --wave(v) is a sine mapped to 0..1, and $wave(@x) and $wave(@y) feed it the column and the row, so the dots swell and fade in a diagonal pattern.",
  section: "Values",
  tags: ["--name()","$name()","$()","@x","@y"],
  docs: ["pages/css-doodle-com/reference/function-define.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
