// PlayCanvas: Image fit modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image fit modes",
  summary:
    "Fit mode decides what a texture of a fixed shape does in an element of another shape: Stretch fills, Contain fits inside, Cover fills and overflows. A 2:1 landscape changes the box shape while four cells show the modes, the last with a mask cropping the overflow.",
  section: "User Interface",
  tags: ["fitMode","FITMODE_STRETCH","FITMODE_CONTAIN","FITMODE_COVER","mask"],
  docs: ["repo/docs/user-manual/user-interface/image-elements.md","repo/docs/user-manual/user-interface/masks.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
