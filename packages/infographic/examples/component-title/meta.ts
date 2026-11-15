// AntV Infographic example: Component: Title
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: Title",
  summary:
    "Title lays out a main title and a description in a column, aligned left, centre or right, wrapping the description to descLineNumber lines and measuring its own height. It needs themeColors, which getThemeColors supplies. A structure registered for the example draws the Title itself; the card changes its alignment, width and line count.",
  section: "Built-in components",
  tags: ["Title", "alignHorizontal", "descLineNumber", "width", "themeColors"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/reference/jsx.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
