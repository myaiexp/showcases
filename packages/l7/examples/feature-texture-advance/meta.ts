// l7 example: Feature texture: animate and textureBlend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature texture: animate and textureBlend",
  summary:
    "On an animated arc about duration / interval textures sit on each line, so duration 1 with interval 0.2 gives five. textureBlend 'replace' drops the line colour under the texture.",
  section: "Layer: Features",
  tags: ["texture","textureBlend","animate","interval","duration","iconStep"],
  docs: ["repo/site/docs/api/common/features/texture.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
