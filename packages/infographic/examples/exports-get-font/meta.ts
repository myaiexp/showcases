// AntV Infographic example: Exports: getFont() by name, null when missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getFont() by name, null when missing",
  summary:
    "getFont(name) returns the registered Font for a name or null when there is none. The card looks up several names, prints the result, and for the ones found sets that family as the infographic's base text font so the drawing changes with the lookup. The last name is not registered.",
  section: "Exports",
  tags: ["getFont", "Font", "fontFamily"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
