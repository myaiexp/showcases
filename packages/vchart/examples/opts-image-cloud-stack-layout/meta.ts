// vchart example: Image cloud: stack layout with overlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image cloud: stack layout with overlap",
  summary: "The stack layout lets images overlap and tilt up to maxAngle, like a pile of stickers inside the mask. A slider turns the angle limit (in radians) and a select picks the placement.",
  section: "Option: Series",
  tags: ["imageCloud","layoutMode: stack","maxAngle","placement","image.padding"],
  docs: [
    'repo/docs/assets/option/en/series/image-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
