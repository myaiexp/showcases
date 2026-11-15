// vega example: interpolate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "interpolate",
  summary:
    "The same yellow-to-blue range drawn once per interpolation method: rgb, hsl, hsl-long, lab, hcl, hcl-long, cubehelix, cubehelix-long, and rgb with a gamma. The lit strip steps down the list; mid-ramp colours differ a lot.",
  section: "Scales",
  tags: ['scale.interpolate','scale.range','scale.type'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
