// css-doodle example: Copies around a ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Copies around a ring",
  summary:
    "A copy runs its steps with its own n, so circle*6 with a rotate of n * 60 after moving down places six small circles around the centre. The button changes only the count N.",
  section: 'Shapes',
  tags: ['@shape', 'circle', 'n', 'rotate'],
  docs: ['repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
