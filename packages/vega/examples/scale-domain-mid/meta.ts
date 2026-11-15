// vega example: domainMid for a Diverging Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "domainMid for a Diverging Scale",
  summary:
    "A grid of values from 0 to 99 coloured with the default diverging range. The mid-point signal decides which value is the neutral centre, so the warm and cool halves shift.",
  section: "Scales",
  tags: ['scale.domainMid','scale.range','scale.type'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
