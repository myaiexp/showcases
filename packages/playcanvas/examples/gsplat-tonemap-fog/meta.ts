// playcanvas example: Splat tonemapping, exposure and fog
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tonemapping, exposure and fog on splats',
  summary:
    'Splats are unlit, but their output colour still goes through the camera tone curve, Scene.exposure and fog. Splat knots stand between lit spheres in linear fog; Scene.gsplat.useTonemap takes the splats out of the tone curve and exposure while the spheres keep them, and Scene.gsplat.useFog does the same for fog.',
  section: 'Gaussian Splatting',
  tags: ['GSplatParams.useTonemap', 'GSplatParams.useFog', 'Scene.exposure', 'CameraComponent.toneMapping', 'FogParams', 'FOG_LINEAR'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/tonemapping.md',
    'repo/docs/user-manual/gaussian-splatting/building/relighting.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
