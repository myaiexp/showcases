// vchart example: Image mark: imageMode, imagePosition and imageScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image mark: imageMode, imagePosition and imageScale",
  summary:
    "A canvas-drawn picture is placed in a fixed box by an image mark. imageMode picks cover, contain, fill or auto; imagePosition anchors it and imageScale zooms it. Controls change the position and scale.",
  section: "Option: Marks and Graphics",
  tags: ["image","imageMode","imagePosition","imageScale","repeatX","repeatY"],
  docs: [
    'repo/docs/assets/option/en/graphic/image.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
