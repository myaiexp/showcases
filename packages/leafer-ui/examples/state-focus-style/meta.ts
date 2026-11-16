// leafer-ui example: State: focus() and focusStyle, one element at a time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: focus() and focusStyle, one element at a time",
  summary: "element.focus() applies focusStyle and element.focus(false) removes it; focusing another element takes it away from the first. The buttons focus each rect or clear it.",
  section: "Interaction",
  tags: ["focusStyle","focus","state plugin"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/state/focus.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/state.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
