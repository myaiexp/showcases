// VFX-JS example: ParticleExplodeEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ParticleExplodeEffect',
  summary:
    'A poster shatters into one burst of particles. ParticleExplodeEffect shows the element until trigger() is called, then flies it apart for duration seconds; it stays gone until reset(), and isDone() says when the burst has faded. Click the picture or use the buttons; cards burst on a timer.',
  section: '@vfx-js/effects',
  tags: ['ParticleExplodeEffect', 'effect', 'trigger', 'reset', 'isDone', 'duration', 'count'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/particle-explode.ts',
    'repo/packages/effects/src/_particle-common.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
