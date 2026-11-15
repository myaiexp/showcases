// vega example: Dotbin: Dot Plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dotbin: Dot Plot",
  summary:
    "Seventy values dropped into bins of a chosen step and stacked into columns of dots whose diameter is one step. Larger steps make fewer, taller stacks; smooth reduces their variance.",
  section: 'Transforms: Basic',
  tags: ["transform.dotbin.step", "transform.dotbin.smooth", "transform.dotbin.signal", "transform.dotbin.as", "transform.stack"],
  docs: ["repo/docs/docs/transforms/dotbin.md", "repo/docs/docs/transforms/stack.md", "repo/docs/docs/transforms/formula.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
