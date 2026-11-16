// leafer-ui example: Resource: loadImage before use
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Resource: loadImage before use",
  summary: "Resource.loadImage(url) returns a promise for the decoded image, so an Image can be added only once it is ready and never pops in. The status line shows loading, then the image size.",
  section: "Utilities",
  tags: ["Resource", "loadImage", "Image", "ILeaferImage"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/resource/Resource.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
