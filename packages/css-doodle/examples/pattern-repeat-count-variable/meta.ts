// repeat(n as i): a count held in a variable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "repeat(n as i): a count held in a variable",
  summary: "The count of a loop is a whole number, or a variable set to one and never changed: n: 160; repeat(n as i) { … }. Each step places a dot by the golden angle, making a sunflower that slowly turns.",
  section: "Patterns",
  tags: ["@pattern", "repeat", "as", "hsl", "shape"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
