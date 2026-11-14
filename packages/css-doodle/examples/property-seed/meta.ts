// css-doodle example: @seed: a seed inside the code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "@seed: a seed inside the code",
  summary:
    "A @seed line makes the doodle render the same every time, whatever the attribute says. Inside a nested @doodle the random functions draw from the parent, so @seed: @p(1, 2) gives each copy one of two seeds.",
  section: "Properties",
  tags: ['@seed', '@doodle', '@p'],
  docs: [
    'pages/css-doodle-com/reference/property-seed.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
