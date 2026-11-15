// vega example: View: Headless
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: A Headless View',
  summary:
    'A view built without a container and with renderer "none" never draws, yet toSVG() returns its chart as a string after each signal change; the page parses the string into the SVG you see and, in the full view, prints the markup.',
  section: 'View API',
  tags: ['view.toSVG', 'view.renderer', 'view.container', 'view.initialize'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/usage/index.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
