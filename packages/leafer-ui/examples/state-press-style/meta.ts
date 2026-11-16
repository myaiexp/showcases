// leafer-ui example: State: pressStyle changes an element while pressed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: pressStyle changes an element while pressed",
  summary: "pressStyle applies while the pointer button is down on the element and is restored on release. The rect darkens and shrinks while held; the card presses it with a simulated pointer.",
  section: "Interaction",
  tags: ["pressStyle","state plugin","scale"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/state/press.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/state/state.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
