// A swizzle on the left: pos.x: abs(pos.x) mirrors everything
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A swizzle on the left: pos.x: abs(pos.x) mirrors everything",
  summary: "A built-in such as pos is copied first, so pos.x: abs(pos.x) mirrors everything after it, and a swizzle on the left writes only those channels. fbm of the mirrored position, minus the distance to the middle, makes a symmetric inkblot that drifts.",
  section: "Patterns",
  tags: ["@pattern", "pos", "swizzle", "fbm"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
