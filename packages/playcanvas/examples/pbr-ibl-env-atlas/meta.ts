// PlayCanvas example: Image based lighting from a generated HDR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image based lighting from a generated HDR",
  summary:
    "An equirect half-float sky is filled in code (sun and softboxes far above 1.0), then turned into a skybox cubemap and a prefiltered lighting atlas with EnvLighting. Metal and plastic spheres show the result, and a TextureRenderer thumbnail draws the source.",
  section: "Graphics: Physically Based Rendering",
  tags: ["EnvLighting", "generateSkyboxCubemap", "generateLightingSource", "generateAtlas", "Scene", "envAtlas", "skybox", "skyboxIntensity", "TextureRenderer"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/image-based-lighting.md", "repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md", "repo/docs/user-manual/graphics/physical-rendering/physical-materials.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
