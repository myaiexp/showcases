// AntV Infographic example: Exports: getTemplates() feeding a renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getTemplates() feeding a renderer",
  summary:
    "getTemplates() lists every registered template id; in 0.2.20 there are 276 of them. The side list shows the array and the caption its length. The card walks through templates picked from several families by prefix, giving each the data field its family reads, and renders them with nothing but the id.",
  section: "Exports",
  tags: ["getTemplates", "template"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/learn/template.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
