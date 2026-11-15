// aframe example: text: side, opacity and alphaTest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "text: side, opacity and alphaTest",
  summary: "A text spins about its Y axis: with side: front it disappears when it faces away, with side: double it reads mirrored from behind, and side: back shows only the back. Opacity fades one line and alphaTest thins the glyph edges of another.",
  section: 'Components',
  tags: ["text", "side", "front", "back", "double", "opacity", "alphaTest", "transparent", "color"],
  docs: ["repo/docs/components/text.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
