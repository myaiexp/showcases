// AntV Infographic example: Built-in pattern: line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Built-in pattern: line",
  summary:
    "The built-in 'line' pattern fills shapes with parallel lines, chosen with themeConfig.stylize { type: 'pattern', pattern: 'line' }. The card applies it to a column chart and steps through its look with the scale, then two colour pairs set by foregroundColor and backgroundColor.",
  section: "Built-in patterns",
  tags: ["stylize", "pattern", "line", "PatternConfig"],
  docs: ["repo/site/src/content/reference/built-in-patterns.en.md", "repo/site/src/content/reference/infographic-types.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
