// marble: a number option written as math with t animates the image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marbling that moves with t',
  summary:
    "A number option also takes math with t, the shader's time in seconds, and the image moves when one reads it. drops: min(t * 5, 40) lets the drops fall in one by one, a comb's angle in parentheses sways with sin(t), and the ink's warp breathes.",
  section: 'Addons',
  tags: ["marble", "t", "drops", "comb", "warp"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/marble/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
