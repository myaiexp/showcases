// VFX-JS example: ParticleEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ParticleEffect',
  summary:
    'Particles sprout from a portrait around the pointer and drift away on a curl-noise field. ParticleEffect emits near ctx.mouse (birthRate) and, with spawnOnIdle, across the picture even while the pointer rests. Its params are read-only: values go in through setParam, which validates them. Cards use a stand-in pointer.',
  section: '@vfx-js/effects',
  tags: ['ParticleEffect', 'effect', 'setParam', 'spawnOnIdle', 'birthRate', 'pointSize', 'mouse', 'pointer'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/particle.ts',
    'repo/packages/effects/src/_particle-common.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
