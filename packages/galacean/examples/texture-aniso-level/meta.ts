// galacean example: Anisotropic filtering level
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Anisotropic filtering level",
  summary:
    "Anisotropic filtering keeps textures clear at grazing angles. A finely striped floor stretches to the horizon, and anisoLevel from 1 up to 16 (as far as the device allows) sharpens its distance.",
  section: "Texture",
  tags: ['Texture2D', 'anisoLevel', 'TextureFilterMode.Trilinear'],
  docs: [
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
