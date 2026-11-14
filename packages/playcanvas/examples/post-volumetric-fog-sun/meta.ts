// playcanvas example: Volumetric fog and sun shafts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Volumetric fog with a directional light',
  summary:
    'CameraFrame.volumetricFog renders height fog lit by a shadow-casting directional light assigned to volumetricFog.light. With the low sun facing the camera, pillars between sun and fog carve shafts out of it; TAA smooths the ray-march noise. The full view sets density, height falloff, anisotropy, intensity, steps and the sun elevation.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'volumetricFog.enabled', 'volumetricFog.light', 'volumetricFog.density', 'volumetricFog.heightFalloff', 'volumetricFog.anisotropy', 'volumetricFog.steps', 'taa.enabled'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/volumetric-fog.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
