// l7 example: addImage, hasImage and removeImage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "addImage, hasImage and removeImage",
  summary:
    "Images registered with addImage are drawn by id as point shapes. removeImage takes an id out of the registry, so hasImage turns false, but icons a layer has already drawn keep their picture.",
  section: 'Scene',
  tags: ["addImage", "hasImage", "removeImage", "icon"],
  docs: ["repo/site/docs/api/scene.en.md", "repo/site/docs/api/point_layer/shape.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
