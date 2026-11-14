// vchart example: Fill shadow: shadowBlur, shadowColor and offsets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fill shadow: shadowBlur, shadowColor and offsets",
  summary:
    "Rect marks carry a drop shadow through shadowBlur, shadowColor, shadowOffsetX and shadowOffsetY. A slider scales the blur and the preview cycles the offset direction.",
  section: "Option: Marks and Graphics",
  tags: ["shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY","fill"],
  docs: [
    'repo/docs/assets/option/en/graphic/fill-style.md',
    'repo/docs/assets/option/en/graphic/attribute.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
