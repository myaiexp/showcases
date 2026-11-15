// zephyr3d example: PCSS soft shadows and their options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PCSS soft shadows and their options',
  summary:
    'Percentage-Closer Soft Shadows search for blockers and widen the penumbra with the receiver\'s distance from them. pcssLightRadius, pcssBlockerSampleCount, pcssFilterSampleCount, pcssMaxFilterRadius and pcssTemporalJitter (with camera.TAA) are all sliders.',
  section: 'Shadows',
  tags: ['shadow.mode', 'pcss', 'pcssLightRadius', 'pcssBlockerSampleCount', 'pcssFilterSampleCount', 'pcssMaxFilterRadius', 'pcssTemporalJitter', 'camera.TAA'],
  docs: ['repo/apps/doc/web/en/shadow-aa.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
