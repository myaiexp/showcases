// AntV Infographic example: Built-in pattern: mosaic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in pattern: mosaic",
  summary:
    "The built-in 'mosaic' pattern fills shapes with irregular shapes, chosen with themeConfig.stylize { type: 'pattern', pattern: 'mosaic' }. The card applies it to a column chart and steps through its look with the scale, then two colour pairs set by foregroundColor and backgroundColor.",
  section: "Built-in patterns",
  tags: ["stylize", "pattern", "mosaic", "PatternConfig"],
  docs: ["repo/site/src/content/reference/built-in-patterns.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
