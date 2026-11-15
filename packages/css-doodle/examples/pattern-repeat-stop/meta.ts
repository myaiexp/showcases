// repeat with a stop test: counting the steps until a sum passes 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "repeat with a stop test: counting the steps until a sum passes 1",
  summary: "Extra arguments after the count stop the loop early once they all hold. Each pixel adds a noisy step to s until s passes 1, and counts how many steps that took; the count becomes a color.",
  section: "Patterns",
  tags: ["@pattern", "repeat", "noise", "ramp"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
