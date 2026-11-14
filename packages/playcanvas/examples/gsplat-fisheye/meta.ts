// playcanvas example: Fisheye rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fisheye rendering of splats and sky',
  summary:
    'Scene.gsplat.fisheye and Sky.fisheye bend a splat plaza and the infinite skybox with the same 0 to 1 amount, while radialSorting avoids sorting artifacts at very wide angles. The camera stands in the middle and turns; the card sweeps from perspective to a dome, the full view has the docs\' ultra-wide, skydome and tiny-planet recipes.',
  section: 'Gaussian Splatting',
  tags: ['GSplatParams.fisheye', 'Sky.fisheye', 'GSplatParams.radialSorting', 'SKYTYPE_INFINITE', 'CameraComponent.fov', 'Scene.skybox'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/fisheye.md',
    'repo/docs/user-manual/gaussian-splatting/building/performance.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
