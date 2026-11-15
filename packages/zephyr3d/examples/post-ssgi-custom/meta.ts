// zephyr3d example: SSGI custom preset and temporal filtering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSGI custom preset and temporal filtering',
  summary:
    'The custom ssgiQualityPreset exposes the trace directly: half or full resolution, rays per pixel, march steps and denoise passes, plus temporal accumulation and its weight. The readout shows the resolved settings.',
  section: 'Post-processing',
  tags: ['SSGI', 'ssgiQualityPreset', 'ssgiHalfResolution', 'ssgiRaysPerPixel', 'ssgiMaxSteps', 'ssgiDenoisePasses', 'ssgiTemporal', 'ssgiTemporalWeight', 'ssgiMaxDistance'],
  docs: ['repo/apps/doc/web/en/posteffect-ssgi.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
