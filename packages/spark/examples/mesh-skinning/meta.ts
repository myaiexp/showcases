// Spark example: SplatMesh.skinning with dual-quaternion SplatSkinning bones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skeletal skinning of a splat worm',
  summary:
    'A tube of splats bound to a chain of six bones through SplatSkinning in dual-quaternion mode. Each splat gets two bone indices and blend weights with setSplatBones; every frame the chain is posed with setBoneQuatPos by forward kinematics, and updateBones() uploads it, so the worm undulates on the GPU.',
  section: 'SplatMesh',
  tags: ['SplatSkinning', 'SplatSkinningMode', 'setRestQuatPos', 'setSplatBones', 'setBoneQuatPos', 'skinning'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/system-design.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
