// AntV Infographic example: Component: ItemValue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: ItemValue",
  summary:
    "ItemValue shows a numeric datum value as text, through a formatter function (String(value) by default) that can add units, and records the raw number in data-value. The card gives the item four formatters and font sizes, as props of design.item, which only an options object can carry.",
  section: "Built-in components",
  tags: ["ItemValue", "value", "formatter", "fontSize"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/reference/jsx.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
