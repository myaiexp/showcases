// PlayCanvas: Masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Masks",
  summary:
    "An image element with mask on clips everything below it. A rectangle mask clips a moving block, a mask with a circle texture takes that shape, and a mask inside a mask shows a child only where both overlap.",
  section: "User Interface",
  tags: ["mask","texture","ELEMENTTYPE_IMAGE","stencil"],
  docs: ["repo/docs/user-manual/user-interface/masks.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
