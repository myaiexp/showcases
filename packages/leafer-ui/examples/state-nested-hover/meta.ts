// leafer-ui example: State: a named state with its own hoverStyle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: a named state with its own hoverStyle",
  summary: "A style in states can itself carry hoverStyle, so the hover look depends on the current state. The rect hovers red in its normal state and gold in the \"active\" one, which a tap switches on.",
  section: "Interaction",
  tags: ["states","state","hoverStyle","state plugin"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/state/state.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/hover.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
