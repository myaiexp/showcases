// leafer-ui example: Viewport: listen for scale changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport: listen for scale changes",
  summary:
    "LeaferEvent.SCALE fires whenever the view's scale changes, by zooming or by assigning scale. The readout is written from the event, not polled.",
  section: "App & Engine",
  tags: ['Leafer', 'LeaferEvent', 'SCALE', 'scaleX', '@leafer-in/viewport'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/advanced/viewport.md', 'pages/www-leaferjs-com/ui/en/reference/display/Leafer.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
