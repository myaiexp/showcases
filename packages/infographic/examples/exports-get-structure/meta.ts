// AntV Infographic example: Exports: getStructure() for one type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getStructure() for one type",
  summary:
    "getStructure(type) returns the registered Structure, an object with its component and its composites (the slots it fills: title and item), or undefined for a name nobody registered. The card looks up several names, prints what came back and renders the ones that exist; the last lookup is a name that is not registered.",
  section: "Exports",
  tags: ["getStructure", "Structure", "composites"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
