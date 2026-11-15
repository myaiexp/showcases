// random(i) and random(i + 1) join cells into a skyline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Dollar: random() follows the seed",
  summary: "random() with arguments is one draw for them, the same wherever it is asked. Each column reads its own height random(i) and its neighbour's random(i + 1), and cuts a clip-path slope between them, so the profile is continuous.",
  section: "Values",
  tags: ["$()","random()","clip-path"],
  docs: ["pages/css-doodle-com/reference/function-dollar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
