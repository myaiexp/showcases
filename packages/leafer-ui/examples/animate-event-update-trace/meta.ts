// leafer-ui example: AnimateEvent: update draws the style it sets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AnimateEvent: update draws the style it sets",
  summary: "The update listener receives the Animate and can read its style. Each call adds a point (time, style.x) to a graph under the track, so the plotted curve is the easing the animation used.",
  section: "Animate plugin",
  tags: ["AnimateEvent", "update", "style", "easing", "on", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate/event/AnimateEvent.md", "pages/www-leaferjs-com/ui/en/plugin/in/animate/options/easing.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
