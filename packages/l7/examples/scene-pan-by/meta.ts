// l7 example: panBy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "panBy",
  summary:
    "panBy moves the map by a number of pixels: positive x pans right, positive y pans down. Four moves trace a square and end where they started.",
  section: 'Scene',
  tags: ["panBy"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
