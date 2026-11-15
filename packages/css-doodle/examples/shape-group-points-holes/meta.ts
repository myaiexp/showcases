// css-doodle example: Point counts per outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point counts per outline",
  summary:
    "A list such as points: 180, 20 gives each outline of a group its own count, outer first and the hole second, so a ring with the same counts morphs. The ring here swells and shrinks with its hole.",
  section: 'Shapes',
  tags: ['@shape', 'points', 'subtract', '@keyframes'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
