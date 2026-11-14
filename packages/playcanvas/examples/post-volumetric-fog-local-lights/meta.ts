// playcanvas example: Volumetric fog with local lights
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Volumetric fog with spot and omni lights',
  summary:
    'With volumetricFog.light left null, localSpotLights and localOmniLights let shadow-casting spot and omni lights scatter in the fog through the clustered shadow atlas: two swinging beams and a drifting pink lamp among pillars. The full view toggles each light type, sets localIntensity, localSteps and density, and tunes each light\'s volumetricScattering.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'volumetricFog.localSpotLights', 'volumetricFog.localOmniLights', 'volumetricFog.localIntensity', 'volumetricFog.localSteps', 'LightComponent.volumetricScattering'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/volumetric-fog.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
