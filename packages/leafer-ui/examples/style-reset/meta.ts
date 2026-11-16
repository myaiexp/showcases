// leafer-ui example: Style: reset() drops every style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Style: reset() drops every style",
  summary:
    "rect.reset() clears the element back to defaults (it vanishes); rect.reset({ ... }) clears it and applies a new style. The example cycles: styled, blank, restyled.",
  section: "Basics",
  tags: ['Rect', 'reset'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/basic/style.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
