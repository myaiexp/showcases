// AntV Infographic example: Exports: getStructures() feeding the renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getStructures() feeding the renderer",
  summary:
    "getStructures() returns the registered structure types as a string array. The chip list shows the whole array, and the card renders the same data once per name from it, so the list and the pictures are the same thing. The caption shows the array length and the structure on screen.",
  section: "Exports",
  tags: ["getStructures", "design", "structure"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
