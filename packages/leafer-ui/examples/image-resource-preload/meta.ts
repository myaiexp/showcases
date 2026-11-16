// leafer-ui example: Image: Resource.loadImage preload
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: Resource.loadImage preload",
  summary:
    "Resource.loadImage(url) resolves once the picture is decoded and cached, so the Image added afterwards appears at once with no pop-in. The caption tracks the two steps.",
  section: "Elements",
  tags: ['Resource', 'loadImage', 'Image', 'url'],
  docs: [
    'pages/www-leaferjs-com/ui/en/reference/display/Image.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
