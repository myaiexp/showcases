// vchart example: Stroke borders: outerBorder and innerBorder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke borders: outerBorder and innerBorder",
  summary:
    "outerBorder and innerBorder draw extra outlines outside and inside a shape, each with its own stroke, lineWidth and distance. A slider moves both borders away from the edge.",
  section: "Option: Marks and Graphics",
  tags: ["outerBorder","innerBorder","distance","lineWidth","stroke"],
  docs: [
    'repo/docs/assets/option/en/graphic/stroke-style.md',
    'repo/docs/assets/option/en/graphic/border-style.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
