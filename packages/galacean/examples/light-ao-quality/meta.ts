// galacean example: Ambient occlusion quality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient occlusion quality",
  summary:
    "AmbientOcclusionQuality Low, Medium and High: lower is cheaper but noisier, higher gives finer detail. The card steps through the three on the same scene.",
  section: "Light",
  tags: ['AmbientOcclusion.quality', 'AmbientOcclusionQuality'],
  docs: [
    'repo/docs/en/graphics/light/ambientOcclusion.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
