// css-doodle example: Functions run once per copy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Functions run once per copy",
  summary:
    "@ functions in a copy run again for each copy, so circle*2 with @pn gives two circles apart, and @r scatters a handful of different ones. A redraw scatters them again.",
  section: 'Shapes',
  tags: ['@shape', 'circle', '@pn', '@r'],
  docs: ['pages/css-doodle-com/reference/function-shape.md', 'repo/docs/languages.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
