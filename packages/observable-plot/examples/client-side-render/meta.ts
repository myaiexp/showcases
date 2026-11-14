// observable-plot example: Client-side rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Client-side rendering',
  summary:
    'The client-side pattern from the React and Vue sections of Getting started: load gistemp.csv, call Plot.plot with a burd colour scheme on the anomaly, append the SVG, and remove it in the cleanup.',
  section: 'Introduction',
  tags: ['Plot.plot', 'dot', 'ruleY', 'scheme burd', 'append', 'remove'],
  docs: ['repo/docs/getting-started.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
