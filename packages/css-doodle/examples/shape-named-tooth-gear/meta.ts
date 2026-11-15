// css-doodle example: A named tooth, copied twelve times
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A named tooth, copied twelve times",
  summary:
    "The grammar's example keeps a trapezoid under the name tooth, then draws it twelve times with #tooth*12, each moved out and turned by n * 30. A circle is subtracted from the middle.",
  section: 'Shapes',
  tags: ['@shape', '#id', 'polygon', 'subtract', 'round'],
  docs: ['repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
