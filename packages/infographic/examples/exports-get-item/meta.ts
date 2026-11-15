// AntV Infographic example: Exports: getItem() and the fields an item reads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getItem() and the fields an item reads",
  summary:
    "getItem(type) returns the item definition, whose composites list the datum fields that item draws (icon, label, desc, value, time, illus). The card looks up several items, prints the composites and renders a datum that has exactly those fields, then asks for a name that does not exist.",
  section: "Exports",
  tags: ["getItem", "Item", "composites"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
