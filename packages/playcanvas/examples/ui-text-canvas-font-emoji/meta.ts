// PlayCanvas: Canvas font and emoji
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas font and emoji",
  summary:
    "MSDF font assets are single-colour and need files; pc.CanvasFont draws characters with the browser's own fonts into textures, emoji included. It holds only the characters it has been given, so updateTextures adds the emoji before text uses them. Every example in this gallery uses it for its labels.",
  section: "User Interface",
  tags: ["CanvasFont","createTextures","updateTextures","font"],
  docs: ["repo/docs/user-manual/user-interface/fonts.md","repo/docs/user-manual/user-interface/text-elements.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
