// vchart example: Symbol shapes: a custom SVG path as symbolType
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol shapes: a custom SVG path as symbolType",
  summary:
    "symbolType accepts an SVG path string instead of a built-in name. Five hand-written paths are drawn as symbol marks, scaled by size, and their size and fill breathe over time.",
  section: "Option: Marks and Graphics",
  tags: ["symbolType","path string","size","symbol"],
  docs: [
    'repo/docs/assets/option/en/graphic/symbol.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
