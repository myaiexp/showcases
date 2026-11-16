// leafer-ui example: Resource: setImage with a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Resource: setImage with a canvas",
  summary: "Resource.setImage('leafer://name.png', canvas) registers an image you drew yourself under a key; an Image with that url then shows it. The canvas is repainted with new colours every time the button is pressed.",
  section: "Utilities",
  tags: ["Resource", "setImage", "remove", "Image", "leafer:// protocol"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/resource/Resource.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
