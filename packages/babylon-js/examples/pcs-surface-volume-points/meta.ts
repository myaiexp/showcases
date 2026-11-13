// babylon-js example: Points cloud from a mesh surface and volume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points cloud from a mesh surface and volume',
  summary:
    'A PointsCloudSystem fills a torus knot and a box with points: addSurfacePoints spreads them evenly over the faces, addVolumePoints through the inside, coloured PointColor.Stated (a base colour with a random range) or PointColor.Random. buildMeshAsync builds the cloud, after which the model meshes are disposed.',
  section: 'Particles',
  tags: ['PointsCloudSystem', 'addSurfacePoints', 'addVolumePoints', 'PointColor', 'buildMeshAsync'],
  docs: [
    'repo/content/features/featuresDeepDive/particles/point_cloud_system.md',
    'repo/content/features/featuresDeepDive/particles/point_cloud_system/pcs_intro.md',
    'repo/content/features/featuresDeepDive/particles/point_cloud_system/pcs_creation.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
