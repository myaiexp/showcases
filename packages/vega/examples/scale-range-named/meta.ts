// vega example: Named Range Defaults
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Named Range Defaults",
  summary:
    "Six scales whose range is only a string, each resolving to a default from the config: a categorical scheme, ordinal and ramp sequential schemes, a heatmap scheme, a diverging scheme and the symbol shapes. The cell count changes how each samples.",
  section: "Scales",
  tags: ['scale.range','scale.type','signal.bind'],
  docs: ['repo/docs/docs/scales.md','repo/docs/docs/config.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
