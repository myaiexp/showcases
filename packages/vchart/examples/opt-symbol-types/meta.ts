// vchart example: Symbol shapes: every built-in symbolType
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol shapes: every built-in symbolType",
  summary:
    "A grid of custom symbol marks, one per built-in symbolType name. The fill, size and symbolType are style attributes of a symbol, and the grid cycles the fill so the cells stay alive.",
  section: "Option: Marks and Graphics",
  tags: ["symbolType","size","customMark","symbol"],
  docs: [
    'repo/docs/assets/option/en/graphic/symbol.md',
    'repo/docs/assets/option/en/graphic/attribute.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
