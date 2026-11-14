// observable-plot example: Area: topline stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: topline stroke',
  summary:
    'An AAPL closing-price area chart. The line option strokes just the topline and lowers the fill opacity; toggle it to compare.',
  section: 'Mark: Area',
  tags: ['areaY', 'line', 'ruleY'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
