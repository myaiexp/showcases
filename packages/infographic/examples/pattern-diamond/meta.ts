// AntV Infographic example: Built-in pattern: diamond
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in pattern: diamond",
  summary:
    "The built-in 'diamond' pattern fills shapes with a diamond grid, chosen with themeConfig.stylize { type: 'pattern', pattern: 'diamond' }. The card applies it to a column chart and steps through its look with the scale, then two colour pairs set by foregroundColor and backgroundColor.",
  section: "Built-in patterns",
  tags: ["stylize", "pattern", "diamond", "PatternConfig"],
  docs: ["repo/site/src/content/reference/built-in-patterns.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
