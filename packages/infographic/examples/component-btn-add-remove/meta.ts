// AntV Infographic example: Components: BtnAdd, BtnRemove and BtnsGroup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Components: BtnAdd, BtnRemove and BtnsGroup",
  summary:
    "BtnAdd and BtnRemove are 20 by 20 rectangles tagged with the data path they act on, collected in a BtnsGroup that takes no layout room. A structure registered for the example places them beside its items; the side panel lists each button's indexes. In 0.2.20 the renderer keeps the group at display none even when the editor is on, so the buttons are present but not drawn. The card changes the item count and the buttons follow.",
  section: "Built-in components",
  tags: ["BtnAdd", "BtnRemove", "BtnsGroup", "indexes", "editable"],
  docs: ["repo/site/src/content/reference/built-in-components.en.md", "repo/site/src/content/learn/editor.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
