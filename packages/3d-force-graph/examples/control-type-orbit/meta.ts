// 3d-force-graph example: Initialisation: orbit controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialisation: orbit controls',
  summary:
    'The second argument to the constructor picks the camera controls: controlType orbit keeps the camera upright and turns around a target, unlike the default trackball. controls() hands back three OrbitControls, so autoRotate, damping and the speed are plain properties.',
  section: 'Initialisation',
  tags: ['ForceGraph3D', 'controlType', 'controls'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
