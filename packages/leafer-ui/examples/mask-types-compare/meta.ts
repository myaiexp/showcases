// leafer-ui example: Mask: the five mask types compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mask: the five mask types compared",
  summary: "path, pixel, grayscale, clipping and clipping-path on the same white-to-black radial mask over a semi-transparent picture. path and pixel clip hard; grayscale reads the gradient as alpha; the clipping types also draw the mask itself.",
  section: "Appearance",
  tags: ["mask","IMaskType","grayscale","clipping","clipping-path","pixel","path"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/mask.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
