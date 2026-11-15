// galacean example: Input: pointer buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: pointer buttons",
  summary:
    "PointerButton values as lit chips: Primary, Secondary, Auxiliary and the extra buttons, driven by pointer.pressedButtons. The page's context menu is blocked over the canvas, as the docs advise for right-clicks.",
  section: "Input",
  tags: ['PointerButton', 'pressedButtons', 'Pointer', 'isPointerHeldDown'],
  docs: [
    'repo/docs/en/input/pointer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
