// vega example: View: Size Methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Width, Height, Padding and Background',
  summary:
    'Sliders and a select call view.width, height, padding and background on a running bar chart, then resize and runAsync; a console inside the chart prints the getters and origin() after each run.',
  section: 'View API',
  tags: ['view.width', 'view.height', 'view.padding', 'view.background', 'view.resize', 'view.origin', 'autosize'],
  docs: ['repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
