// postprocessing example: Shock wave: explode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shock wave: explode',
  summary:
    "ShockWaveEffect distorts the picture in a ring that grows from a world position. Calling explode() starts the ring; it runs until it passes maxRadius and then switches itself off. The example fires it every few seconds, and a button fires it on demand.",
  section: 'Shock Wave',
  tags: ['ShockWaveEffect', 'explode', 'position'],
  docs: ['repo/README.md', 'repo/src/effects/ShockWaveEffect.js', 'repo/src/effects/glsl/shock-wave.frag', 'repo/src/effects/glsl/shock-wave.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
