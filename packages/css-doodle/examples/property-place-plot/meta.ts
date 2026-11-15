// css-doodle example: @place with @plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@place with @plot",
  summary:
    "The point of a @place can come from @plot, which here walks a circle of radius .8. The container turns with @t so the ring spins.",
  section: "Properties",
  tags: ['@place', '@plot', '@t'],
  docs: [
    'pages/css-doodle-com/reference/property-place.md',
    'pages/css-doodle-com/reference/function-plot.md',
    'pages/css-doodle-com/reference/function-t.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
