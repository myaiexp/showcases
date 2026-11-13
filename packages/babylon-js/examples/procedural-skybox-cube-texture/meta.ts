// babylon-js example: skybox from a generated cube texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skybox from a generated cube texture',
  summary:
    'The docs\' manual skybox: a large box with backFaceCulling off, disableLighting, infiniteDistance and a CubeTexture set as reflectionTexture in SKYBOX_MODE. The six faces are painted on canvases (day, dusk, night) instead of loaded, and a sphere reflects the same sky.',
  section: 'Environment',
  tags: ['CubeTexture', 'Texture.SKYBOX_MODE', 'reflectionTexture', 'infiniteDistance', 'renderingGroupId', 'StandardMaterial'],
  docs: [
    'repo/content/features/featuresDeepDive/environment/skybox.md',
    'repo/content/features/introductionToFeatures/chap5/sky.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
