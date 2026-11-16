// leafer-ui example: AnimateEasing: register a custom easing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AnimateEasing: register a custom easing",
  summary: "AnimateEasing.register(name, factory) adds an easing that the { name, value } form then builds, here an ease-out with a decaying wobble of the given size, next to the built-in ease-out. The registry is global, so the example removes its name when it unmounts.",
  section: "Animate plugin",
  tags: ["AnimateEasing", "register", "easing", "ICustomEasingFunction", "animate", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate/options/easing.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
