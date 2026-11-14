// observable-plot example: Plots: mark.plot shorthand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: mark.plot shorthand',
  summary:
    'A bar mark that renders itself with mark.plot; extra marks in options.marks are drawn on top of it.',
  section: 'Plots',
  tags: ['mark.plot', 'Plot.barY', 'Plot.ruleY', 'marks'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
