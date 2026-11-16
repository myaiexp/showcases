// leafer-ui example: BoundsEvent: resize, inner, local and world
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "BoundsEvent: resize, inner, local and world",
  summary: "The four bounds events fire for different changes: bounds.resize and bounds.inner for size, bounds.local for position and transforms, bounds.world also when the viewport or a parent moves. Pick a change and see which listeners ran.",
  section: "Events",
  tags: ["BoundsEvent.RESIZE", "BoundsEvent.INNER", "BoundsEvent.LOCAL", "BoundsEvent.WORLD"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Bounds.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
