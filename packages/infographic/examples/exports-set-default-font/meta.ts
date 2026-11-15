// AntV Infographic example: Exports: setDefaultFont() changes the default family
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: setDefaultFont() changes the default family",
  summary:
    "setDefaultFont(name) sets the family text is drawn and measured in when nothing else says otherwise. The card calls it with each of the gallery's local font names and re-renders the same infographic; the original default is put back when the example is left, because the setting is page-wide.",
  section: "Exports",
  tags: ["setDefaultFont", "getFont", "font-family"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
