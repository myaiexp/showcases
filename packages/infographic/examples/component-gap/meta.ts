// AntV Infographic example: Component: Gap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: Gap",
  summary:
    "Gap draws nothing: it is a placeholder that takes up room inside a FlexLayout, so two neighbours sit a chosen distance apart. The card renders an icon, a Gap and a label in a row, and changes the Gap's width; the items move apart while the Gap itself never shows.",
  section: "Built-in components",
  tags: ["Gap", "FlexLayout", "width"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/reference/jsx.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
