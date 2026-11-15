// AntV Infographic example: Built-in palette: spectral
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in palette: spectral",
  summary:
    "The spectral palette is a function that spreads a red to blue ramp over however many items there are, which suits continuous data. The card renders a funnel of 3, 5 and 9 steps with themeConfig.palette set to 'spectral' and draws the ramp beside it, so the same range stretches to the count.",
  section: "Built-in themes & palettes",
  tags: ["palette", "spectral", "getPalette"],
  docs: ["repo/site/src/content/reference/built-in-palettes.en.md", "repo/site/src/content/reference/infographic-exports.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
