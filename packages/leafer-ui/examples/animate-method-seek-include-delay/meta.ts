// leafer-ui example: Animate: seek() including the delay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animate: seek() including the delay",
  summary: "seek(time, true) counts the delay as part of the timeline: with delay 1, seeking to 0.5 lands inside the wait and 2 lands one second into the slide.",
  section: "Animate plugin",
  tags: ["seek", "delay", "includeDelay", "Animate", "@leafer-in/animate"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/animate/Animate/seek.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
