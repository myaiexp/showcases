// postprocessing example: Shock wave: epicenter position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shock wave: epicenter position',
  summary:
    "The ring starts at ShockWaveEffect.position, a world-space Vector3 that the effect projects to the screen each frame while the camera sways. The example hops the position between objects; in the full view the sliders move it freely.",
  section: 'Shock Wave',
  tags: ['ShockWaveEffect', 'position', 'explode'],
  docs: ['repo/README.md', 'repo/src/effects/ShockWaveEffect.js', 'repo/src/effects/glsl/shock-wave.frag', 'repo/src/effects/glsl/shock-wave.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
