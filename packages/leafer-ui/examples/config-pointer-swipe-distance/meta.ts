// leafer-ui example: Config pointer: swipeDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config pointer: swipeDistance",
  summary:
    "pointer.swipeDistance (20 px) is the shortest quick movement that counts as a swipe. A SwipeEvent.RIGHT listener counts swipes; the ghost flicks 60 px to the right, which stops counting once the setting is higher.",
  section: "App & engine config",
  tags: ['Leafer', 'pointer', 'swipeDistance', 'SwipeEvent', 'RIGHT'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/pointer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
