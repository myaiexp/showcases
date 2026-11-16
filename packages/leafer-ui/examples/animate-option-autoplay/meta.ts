// leafer-ui example: Animate option: autoplay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animate option: autoplay",
  summary: "autoplay: false builds the animation without starting it; a tap on the square calls play(). The upper lane is made with rect.animate(), the lower with new Animate; a ghost pointer taps each in turn in a card.",
  section: "Animate plugin",
  tags: ["autoplay", "play", "animate", "Animate", "PointerEvent", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate/options/autoplay.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
