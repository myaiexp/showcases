// vega example: Band Scale with a Step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Band Scale with a Step",
  summary:
    "The range is a step size in pixels per band, not an extent. The data rectangle gets wider as the step grows, and the width signal reads the resulting range back.",
  section: "Scales",
  tags: ['scale.type','scale.range.step'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
