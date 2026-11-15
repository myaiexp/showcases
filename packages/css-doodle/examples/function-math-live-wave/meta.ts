// @sin(@ts + @i / 4) becomes CSS math and keeps moving
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: a sine of live time",
  summary: "With a live value such as @ts among the arguments, the result is CSS math for the browser, so it keeps changing. Sixty thin lines slide sideways by a sine of time offset by their index, making a travelling wave.",
  section: "Values",
  tags: ["@sin","@ts","@iI","translate"],
  docs: ["pages/css-doodle-com/reference/function-math.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
