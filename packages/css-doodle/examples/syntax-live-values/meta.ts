// Live values: math around @t is emitted as calc() over a CSS variable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live values become CSS math',
  summary:
    "Values that follow time, the pointer or the doodle's size, such as @t, have no number when the doodle is generated: they are CSS variables. Math around them is written out as CSS math, so $(@t / 10 + @i * 7)deg turns into a calc() that the browser keeps updating, and every leaf spins with its own offset.",
  section: 'Syntax overview',
  tags: ["@t", "live values", "$()", "calc()"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "pages/css-doodle-com/reference/function-t.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
