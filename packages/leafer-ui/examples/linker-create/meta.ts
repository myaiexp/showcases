// leafer-ui example: Linker: connect two elements by id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linker: connect two elements by id",
  summary:
    "A Linker's startPoint and endPoint name elements by id; the connector follows them when they move. One leaves a dot on its right edge, one picks its direction by itself and has an arrow.",
  section: "Official plugins",
  tags: ["Linker", "@leafer-in/linker", "startPoint", "endPoint", "strokes"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/linker.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
