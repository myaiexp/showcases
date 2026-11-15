// AntV Infographic example: Exports: getPalette() by name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getPalette() by name",
  summary:
    "getPalette(name) returns a palette by its name: a colour array, a function of (ratio, index, count), or undefined when no such palette is registered. The card looks up three names; an array is drawn as its colours, a function is called at eight positions, and a missing name is reported.",
  section: "Exports",
  tags: ["getPalette", "Palette"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
