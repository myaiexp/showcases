// match(test, a, b): picking a value inside an expression
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "match(test, a, b): picking a value inside an expression",
  summary: "Inside a value, match(test, a, b) picks a or b: there is no ?: operator. The black and white boundary here is the test y > 16 + 6sin(x / 3 + t), a wave that moves because it reads the time t.",
  section: "Patterns",
  tags: ["@pattern", "match", "t", "sin"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
