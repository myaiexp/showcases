// zephyr3d example: Floating bodies on the waves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Floating bodies on the waves",
  summary:
    "WaterSurfaceSampler batches height queries over a fixed lattice; FloatingBody turns sampleWorldYRaw into a buoyant force for boxes of different mass and submergedFraction. A tick updates the sampler and each body.",
  section: "Environment",
  tags: ['WaterSurfaceSampler', 'FloatingBody', 'sampleWorldYRaw', 'submergedFraction', 'update'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
