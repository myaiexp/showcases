// l7 example: texture: an image along the line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "texture: an image along the line",
  summary:
    "scene.addImage('arrow', url) registers an image once; texture('arrow') plus style({ lineTexture: true, iconStep }) repeats it along the line. The image here is drawn in code.",
  section: "Line Layer",
  tags: ["texture","addImage","lineTexture","iconStep"],
  docs: ["repo/site/docs/api/line_layer/texture.en.md","repo/site/docs/api/common/features/texture.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
