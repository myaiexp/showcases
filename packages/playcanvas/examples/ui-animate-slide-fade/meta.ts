// PlayCanvas: Animating UI: slide and fade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animating UI: slide and fade",
  summary:
    "UI is animated through the properties of its elements. A panel slides in by its position with an ease-out and fades by the opacity of every image and text element below it, since opacity does not cascade; each element's own opacity is remembered first.",
  section: "User Interface",
  tags: ["setLocalPosition","opacity","ELEMENTTYPE_GROUP","math.lerp"],
  docs: ["repo/docs/user-manual/user-interface/common-widgets.md","repo/docs/user-manual/user-interface/elements.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
