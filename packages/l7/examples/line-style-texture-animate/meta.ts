// l7 example: style: texture with animate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style: texture with animate",
  summary:
    "On an animated arc the textures per line is about duration / interval. Here duration is 1 and interval goes from 0.5 to 0.1: two textures, then ten.",
  section: "Line Layer",
  tags: ["style","animate","interval","duration","trailLength","lineTexture","iconStep"],
  docs: ["repo/site/docs/api/line_layer/style.en.md","repo/site/docs/api/common/features/texture.en.md","repo/site/docs/api/common/features/animate.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
