// AntV Infographic example: Exports: getPalettes() drawn as swatches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Exports: getPalettes() drawn as swatches",
  summary:
    "getPalettes() returns every registered palette; in 0.2.20 that is an object keyed by name (the docs call it an array). Array palettes are drawn as their colours, function palettes are sampled across their ratio. The card applies each palette name to a list so the swatches and the picture agree.",
  section: "Exports",
  tags: ["getPalettes", "Palette", "antv", "spectral"],
  docs: ["repo/site/src/content/reference/infographic-exports.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
