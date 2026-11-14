// observable-plot example: Appending a detached plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Appending a detached plot',
  summary:
    'The vanilla HTML setup from Getting started: .plot() returns a detached SVG element, and the page puts it into a div with element.append. A new uniform histogram replaces the old one every few seconds.',
  section: 'Introduction',
  tags: ['plot()', 'append', 'rectY', 'binX', 'Math.random'],
  docs: ['repo/docs/getting-started.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
