// leafer-ui example: Image: ImageEvent.LOADED
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: ImageEvent.LOADED",
  summary:
    "image.once(ImageEvent.LOADED, fn) runs when the picture has loaded; the event carries the image wrapper. A new Image is created on every run to log the event again.",
  section: "Elements",
  tags: ['Image', 'ImageEvent', 'LOADED', 'once'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
