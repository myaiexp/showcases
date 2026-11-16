// leafer-ui example: Animate: a plain object as target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animate: a plain object as target",
  summary: "The target of an Animate can be any object, not just an element. Here a plain { angle, size } object is animated and a listener copies it onto a Star at every update.",
  section: "Animate plugin",
  tags: ["Animate", "target", "update", "AnimateEvent", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate.md", "pages/www-leaferjs-com/ui/en/plugin/in/animate/event/AnimateEvent.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
