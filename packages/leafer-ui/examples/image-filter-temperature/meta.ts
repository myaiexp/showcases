// leafer-ui example: Image filter: temperature from -1 to 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image filter: temperature from -1 to 1",
  summary:
    "The temperature filter adds red and removes blue for positive values, the opposite for negative ones: warm to cool.",
  section: 'Official plugins',
  tags: ["ImageFilter", "filter", "image paint", "temperature"],
  docs: [
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter.md',
    'pages/www-leaferjs-com/ui/en/plugin/in/image-filter/update.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
