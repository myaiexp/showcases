// smin(a, b, k): distances that melt into each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "smin(a, b, k): distances that melt into each other",
  summary: "smin(a, b, k) is a smooth minimum, so two distances join with a rounded neck. The variants draw three moving discs with a plain min() and with smin(.2): the second one flows together like metaballs.",
  section: "Patterns",
  tags: ["@pattern", "smin", "shape", "length"],
  docs: ['pages/css-doodle-com/reference/function-pattern.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
