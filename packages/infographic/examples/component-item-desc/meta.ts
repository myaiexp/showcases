// AntV Infographic example: Component: ItemDesc
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: ItemDesc",
  summary:
    "ItemDesc is the description text of an item: 14px grey text that wraps within its width and keeps to lineNumber lines (two by default), growing its height to match. The card sets lineNumber to 1, 2 and 4 on long descriptions, and a narrower width, so the clipped and wrapped text shows.",
  section: "Built-in components",
  tags: ["ItemDesc", "lineNumber", "width", "wordWrap"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/reference/jsx.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
