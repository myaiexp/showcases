// galacean example: Ambient occlusion parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient occlusion parameters",
  summary:
    "Each tuning parameter from the docs' table as a slider: intensity, power, radius, bias, bilateralThreshold and minHorizonAngle. The card sweeps radius and intensity together to show the spread of the darkening.",
  section: "Light",
  tags: ['AmbientOcclusion', 'intensity', 'power', 'radius', 'bias', 'bilateralThreshold', 'minHorizonAngle'],
  docs: [
    'repo/docs/en/graphics/light/ambientOcclusion.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
