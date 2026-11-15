// galacean example: Texture wrap mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture wrap mode",
  summary:
    "UVs that run past [0, 1] (the material's tilingOffset stretches them to -0.5..1.5) sample according to wrapModeU and wrapModeV: Clamp repeats the edge texel, Repeat tiles, Mirror flips every other tile.",
  section: "Texture",
  tags: ['Texture2D', 'wrapModeU', 'wrapModeV', 'TextureWrapMode'],
  docs: [
    'repo/docs/en/graphics/texture/texture.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
