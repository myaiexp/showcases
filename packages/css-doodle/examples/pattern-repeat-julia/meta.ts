// repeat(n, stop): iterating a Julia set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "repeat(n, stop): iterating a Julia set",
  summary: "repeat(n as k) { … } runs its body n times, and extra arguments stop the loop early once they hold. Here 96 steps of z → z² + c run per pixel, stopping when z has escaped; the variants hold c still, then move it around a circle.",
  section: "Patterns",
  tags: ["@pattern", "repeat", "vec2", "hsl", "match"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
