// l7 example: Feature texture: addImage and lineTexture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature texture: addImage and lineTexture",
  summary:
    "An image added with scene.addImage becomes a line texture through texture(id) and style({ lineTexture: true, iconStep }). Here animate() slides it along the line.",
  section: "Layer: Features",
  tags: ["texture","addImage","lineTexture","iconStep","animate"],
  docs: ["repo/site/docs/api/common/features/texture.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
