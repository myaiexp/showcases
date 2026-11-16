// leafer-ui example: State: priority from selected up to disabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: priority from selected up to disabled",
  summary: "When several state styles apply, the order from lowest to highest is state, selected, focus, hover, press, disabled. A card walks the states on, one more each step, and the fill shows which one currently wins.",
  section: "Interaction",
  tags: ["selectedStyle","focusStyle","hoverStyle","pressStyle","disabledStyle","state plugin"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/state/state.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/selected.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/focus.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/hover.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/press.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/disabled.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
