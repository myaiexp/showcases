// vchart example: markPoint itemContent types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "markPoint itemContent types",
  summary: "One markPoint, four kinds of content: itemContent.type text, symbol, image and richText. The image is drawn on a canvas and passed as a data URL; a select (and the card's timer) switches the type.",
  section: "Option: Components",
  tags: ["markPoint.itemContent.type","text","symbol","image","richText"],
  docs: [
    'repo/docs/assets/option/en/component/mark-point.md',
    'repo/docs/assets/option/en/component/marker-common/marker-symbol.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
