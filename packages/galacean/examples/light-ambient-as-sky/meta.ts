// galacean example: Ambient specular texture as the sky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Ambient specular texture as the sky",
  summary:
    "The docs' comment made real: ambientLight.specularTexture is used as the SkyBoxMaterial texture with textureDecodeRGBM = true, so the background is the very environment the metal sphere reflects.",
  section: "Light",
  tags: ['AmbientLight', 'specularTexture', 'specularTextureDecodeRGBM', 'SkyBoxMaterial', 'textureDecodeRGBM'],
  docs: [
    'repo/docs/en/graphics/light/ambient.mdx',
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
