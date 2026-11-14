// vchart example: Graphic attributes: angle, scale, scaleCenter and offsets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Graphic attributes: angle, scale, scaleCenter and offsets",
  summary:
    "Every graphic takes angle, scaleX, scaleY, scaleCenter, dx and dy. Four rect marks show each one against a dashed copy of the untransformed rect; a slider drives the values.",
  section: "Option: Marks and Graphics",
  tags: ["angle","scaleX","scaleY","scaleCenter","dx","dy"],
  docs: [
    'repo/docs/assets/option/en/graphic/attribute.md',
    'repo/docs/assets/option/en/graphic/rect.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
