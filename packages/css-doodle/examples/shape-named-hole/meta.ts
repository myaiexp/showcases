// css-doodle example: Naming a shape with #id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Naming a shape with #id",
  summary:
    "name#id keeps a shape for later instead of drawing it, and #id draws it with extra commands added. Here a small circle is declared as a hole and used inside subtract, where it is moved off-centre.",
  section: 'Shapes',
  tags: ['@shape', 'subtract', 'circle', '#id'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
