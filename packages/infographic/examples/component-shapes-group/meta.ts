// AntV Infographic example: Component: ShapesGroup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Component: ShapesGroup",
  summary:
    "ShapesGroup is a Group marked data-element-type=\"shapes-group\", so a theme's base.shape styles reach every shape inside it at once. The item here draws two shapes in a ShapesGroup and one in a plain Group; the card changes base.shape and only the grouped shapes follow.",
  section: "Built-in components",
  tags: ["ShapesGroup", "Group", "base.shape", "themeConfig"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/reference/built-in-themes.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
