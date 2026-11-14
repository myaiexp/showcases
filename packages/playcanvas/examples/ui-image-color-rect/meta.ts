// PlayCanvas: Image colour, opacity and rect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image colour, opacity and rect",
  summary:
    "An image element draws a texture multiplied by its colour, at its opacity, or just part of it through rect. One generated texture is drawn four ways: whole, its top-left quarter, tinted with a cycling colour, and fading over an orange stripe.",
  section: "User Interface",
  tags: ["ELEMENTTYPE_IMAGE","texture","color","opacity","rect"],
  docs: ["repo/docs/user-manual/user-interface/image-elements.md","repo/docs/user-manual/editor/scenes/components/element.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
