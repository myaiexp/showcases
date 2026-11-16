// leafer-ui example: Editor config: beforeSkew changes the skew amount
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: beforeSkew changes the skew amount",
  summary: "beforeSkew gets { target, origin, skewX, skewY } and returns new values: here skewY is zeroed, so a Ctrl-drag on the right edge (which skews vertically) does nothing.",
  section: 'Graphic editor',
  tags: ["Editor", "beforeSkew", "skewX", "skewY"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/event/EditorSkewEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
