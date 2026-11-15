// postprocessing example: Shock wave: wave size and amplitude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shock wave: wave size and amplitude',
  summary:
    "waveSize sets how thick the distorted band is, and amplitude how far it pushes pixels outwards. A thin, strong wave looks like a shock front; a thick, weak one like a heat haze.",
  section: 'Shock Wave',
  tags: ['ShockWaveEffect', 'waveSize', 'amplitude', 'explode'],
  docs: ['repo/README.md', 'repo/src/effects/ShockWaveEffect.js', 'repo/src/effects/glsl/shock-wave.frag', 'repo/src/effects/glsl/shock-wave.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
