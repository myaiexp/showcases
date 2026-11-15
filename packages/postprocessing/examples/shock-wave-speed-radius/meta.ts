// postprocessing example: Shock wave: speed and max radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shock wave: speed and max radius',
  summary:
    "speed scales how quickly the ring expands and maxRadius is how far it grows before it ends, in screen units. A fast, small wave reads as a pop; a slow, wide one as a swell.",
  section: 'Shock Wave',
  tags: ['ShockWaveEffect', 'speed', 'maxRadius', 'explode'],
  docs: ['repo/README.md', 'repo/src/effects/ShockWaveEffect.js', 'repo/src/effects/glsl/shock-wave.frag', 'repo/src/effects/glsl/shock-wave.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
