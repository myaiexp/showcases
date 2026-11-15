// l7 example: style: textureBlend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style: textureBlend",
  summary:
    "textureBlend decides how a line texture meets the line's own colour: 'normal' mixes the arrow with the colour, 'replace' paints the texture instead.",
  section: "Line Layer",
  tags: ["style","textureBlend","ITextureBlend","lineTexture","texture","addImage"],
  docs: ["repo/site/docs/api/line_layer/style.en.md","repo/site/docs/api/common/features/texture.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
