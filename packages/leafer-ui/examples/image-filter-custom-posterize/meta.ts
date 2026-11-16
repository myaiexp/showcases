// leafer-ui example: Image filter: a posterize shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: a posterize shader",
  summary:
    "A custom filter whose value is a number of colour levels: the shader rounds every channel to that many steps, turning the picture into flat bands.",
  section: 'Official plugins',
  tags: ["registerImageFilter", "GLSL", "posterize"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
