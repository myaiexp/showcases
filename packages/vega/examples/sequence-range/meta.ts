// vega example: Sequence: Start, Stop, Step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequence: Start, Stop, Step",
  summary:
    "A number line built by sequence from three sliders. Start is included, stop is not, and when stop is below start a negative step counts down.",
  section: 'Transforms: Basic',
  tags: ["transform.sequence.start", "transform.sequence.stop", "transform.sequence.step", "transform.sequence.as"],
  docs: ["repo/docs/docs/transforms/sequence.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
