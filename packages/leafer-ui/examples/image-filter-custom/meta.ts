// leafer-ui example: Image filter: registerImageFilter with a GLSL function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: registerImageFilter with a GLSL function",
  summary:
    "registerImageFilter(name, glsl) adds a filter: the shader function takes the colour c, the value v, the pixel's uv and the resolution. This one multiplies the colour by 1 + 0.3 v. The name may only contain letters.",
  section: 'Official plugins',
  tags: ["registerImageFilter", "GLSL", "filter", "image paint"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
