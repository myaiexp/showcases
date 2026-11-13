// babylon-js example: Points cloud galaxy with updateParticle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points cloud galaxy with updateParticle',
  summary:
    'Three addPoints groups, one per spiral arm, placed by a function that receives each particle with its index and group index. updateParticle rotates every point faster near the centre, run through setParticles each frame, or in three chunks with the start, end and update arguments so the mesh is rebuilt every third frame.',
  section: 'Particles',
  tags: ['PointsCloudSystem', 'addPoints', 'updateParticle', 'setParticles', 'groupId'],
  docs: [
    'repo/content/features/featuresDeepDive/particles/point_cloud_system/pcs_creation.md',
    'repo/content/features/featuresDeepDive/particles/point_cloud_system/pcs_manage.md',
    'repo/content/features/featuresDeepDive/particles/point_cloud_system/pcs_manage_particles.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
