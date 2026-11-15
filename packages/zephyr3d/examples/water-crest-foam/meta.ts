// zephyr3d example: Crest foam on steep waves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Crest foam on steep waves",
  summary:
    "Steep Gerstner waves fold over; foamAmount maps that folding to coverage, foamFalloff keeps only genuinely broken crests, foamColor tints it. The generator's foamWidth and foamContrast shape the folding data.",
  section: "Environment",
  tags: ['foamAmount', 'foamFalloff', 'foamColor', 'foamWidth', 'foamContrast', 'GerstnerWaveGenerator'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
