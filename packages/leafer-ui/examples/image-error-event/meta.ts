// leafer-ui example: Image: ImageEvent.ERROR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: ImageEvent.ERROR",
  summary:
    "image.once(ImageEvent.ERROR, fn) fires when a picture fails to load, and e.error says why. A data URL that cannot be decoded triggers it without any request.",
  section: "Elements",
  tags: ['Image', 'ImageEvent', 'ERROR', 'once', 'placeholderColor'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
