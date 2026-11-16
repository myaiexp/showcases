// leafer-ui example: Eraser: pixel and path types with a faint eraser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Eraser: pixel and path types with a faint eraser",
  summary: "A pixel eraser erases by its alpha, so opacity 0.5 erases half; a path eraser clips by its outline and ignores alpha. The slider sets the opacity of both eraser rings.",
  section: "Appearance",
  tags: ["eraser","IEraserType","pixel","path","opacity"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/eraser.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
