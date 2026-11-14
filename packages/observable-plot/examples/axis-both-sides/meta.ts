// observable-plot example: Axis: both sides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis: both sides',
  summary:
    'A bar chart with the x axis on top and bottom, made two ways: the axis scale option set to both, or two explicit axisX marks with a grid mark; explicit axes can be drawn atop the bars.',
  section: 'Mark: Axis',
  tags: ['axisX', 'gridX', 'barX', 'axis'],
  docs: ['repo/docs/marks/axis.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
