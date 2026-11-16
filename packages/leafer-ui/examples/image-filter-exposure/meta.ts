// leafer-ui example: Image filter: exposure from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: exposure from -1 to 1",
  summary:
    "The exposure filter scales brightness by 2 to the power of its value: -1 halves the light, 1 doubles it, 0 changes nothing. The slider sweeps it on the GPU.",
  section: 'Official plugins',
  tags: ["ImageFilter", "filter", "image paint", "exposure"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
