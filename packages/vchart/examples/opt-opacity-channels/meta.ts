// vchart example: Opacity, fillOpacity and strokeOpacity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opacity, fillOpacity and strokeOpacity",
  summary:
    "Three rects over a bright stripe fade through different attributes: opacity fades the whole shape, fillOpacity only the fill, strokeOpacity only the outline. A slider sets the value.",
  section: "Option: Marks and Graphics",
  tags: ["opacity","fillOpacity","strokeOpacity"],
  docs: [
    'repo/docs/assets/option/en/graphic/attribute.md',
    'repo/docs/assets/option/en/graphic/fill-style.md',
    'repo/docs/assets/option/en/graphic/stroke-style.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
