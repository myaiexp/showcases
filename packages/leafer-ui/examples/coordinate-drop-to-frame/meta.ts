// leafer-ui example: Coordinates: drop DOM shapes into a Frame
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Coordinates: drop DOM shapes into a Frame",
  summary:
    "Dropping into a Frame needs one more step: getWorldPointByClient() gives world coordinates and frame.getInnerPoint() converts them into the Frame's own space, so shapes land under the cursor inside the Frame.",
  section: "Advanced",
  tags: ['App', 'Frame', 'getWorldPointByClient', 'getInnerPoint', 'Rect.one', 'Ellipse.one', '@leafer-in/editor'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/coordinate.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
