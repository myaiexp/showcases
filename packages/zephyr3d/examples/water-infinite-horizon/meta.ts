// zephyr3d example: Infinite water to the horizon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infinite water to the horizon",
  summary:
    "With infinite on, the clipmap's outer ring becomes a horizon skirt and the water reaches the sky past its region. viewDistance bounds how far it is built; 0 derives it from the horizon for the camera's height.",
  section: "Environment",
  tags: ['infinite', 'viewDistance', 'gridScale', 'Water'],
  docs: ['repo/apps/doc/web/en/water.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
