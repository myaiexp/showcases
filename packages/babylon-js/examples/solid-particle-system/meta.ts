// babylon-js example: Solid particle system
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Solid particle system",
  summary:
    "A SolidParticleSystem of boxes and polyhedra merged into one mesh, each particle spun and orbited from updateParticle.",
  section: 'Particles',
  tags: ['SolidParticleSystem', 'addShape', 'buildMesh', 'updateParticle', 'setParticles'],
  docs: [
    'repo/content/features/featuresDeepDive/particles/solid_particle_system/sps_intro.md',
    'repo/content/features/featuresDeepDive/particles/solid_particle_system/sps_animate.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
