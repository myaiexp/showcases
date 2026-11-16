// leafer-ui example: Linker: createLinkerPoint builds a point to edit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linker: createLinkerPoint builds a point to edit",
  summary:
    "createLinkerPoint(world, node) only makes the point data, so you can change it before assigning it as endPoint: here its offset slides along the box edge.",
  section: "Official plugins",
  tags: ["Linker", "@leafer-in/linker", "createLinkerPoint", "offset"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/linker.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
