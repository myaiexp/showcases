// observable-plot example: A line fed by the mouse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A line fed by the mouse',
  summary:
    'The Svelte section of Getting started, without Svelte: a lineY of a sine wave, where every mouse move over the chart appends Math.atan2(x, y) of the pointer and draws a new plot in place of the old one.',
  section: 'Introduction',
  tags: ['lineY', 'grid', 'd3.pointer', 're-render'],
  docs: ['repo/docs/getting-started.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
