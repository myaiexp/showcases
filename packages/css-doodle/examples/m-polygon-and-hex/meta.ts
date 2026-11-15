// css-doodle example: Polygon points and random hex colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polygon points and random hex colors',
  summary:
    '@M joins with spaces, so @M2(@r(100%)) is an x and y pair, and @m3 gathers three of them into a polygon. @rep joins with nothing, so #@rep6(@p([0-9a-f])) glues six random hex digits into a color.',
  section: 'Sequence',
  tags: ['@m', '@M', '@rep', '@r', '@p', 'clip-path'],
  docs: [
    'pages/css-doodle-com/reference/function-m.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
