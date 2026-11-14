// playcanvas example: CameraFrame ambient occlusion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame SSAO',
  summary:
    'Screen-space ambient occlusion darkens creases and contact points: boxes leaning on each other and a ball on the floor go from flat to grounded as cameraFrame.ssao.type switches between none, lighting and combine. The full view sets intensity, radius, power, sample count and the blur.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'ssao.type', 'SSAOTYPE_COMBINE', 'SSAOTYPE_LIGHTING', 'ssao.intensity', 'ssao.radius', 'ssao.power', 'ssao.samples'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md', 'repo/docs/user-manual/graphics/posteffects/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
