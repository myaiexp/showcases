// css-doodle example: The seed of a scatter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The seed of a scatter",
  summary:
    "seed fixes the random points of .scatter, jitter and @R.t, so a redraw of the doodle no longer moves them. The buttons change only the seed command.",
  section: 'Shapes',
  tags: ['@plot.scatter', 'seed'],
  docs: ['pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
