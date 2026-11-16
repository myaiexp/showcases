// leafer-ui example: Animate: animate() getter, killAnimate() and kill()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animate: animate() getter, killAnimate() and kill()",
  summary: "animate() with no argument returns the animation now on the element. killAnimate() ends it and the element jumps to the end style; the instance's kill(false) stops it where it stands. The readout reads the getter every frame.",
  section: "Element animation",
  tags: ["animate", "killAnimate", "Animate", "kill"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/UI/animate.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
