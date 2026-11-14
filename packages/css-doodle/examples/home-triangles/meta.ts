// The landing page's first doodle: random triangles that ripple to new picks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A CSS-like language',
  summary:
    'The first doodle on the css-doodle home page: a 16 × 9 grid whose cells each pick one of four colours and one of four triangles, written as quoted polygon() point lists. Every cell also picks its own transition length with @r(1s), so each redraw ripples across the grid.',
  section: 'Getting started',
  tags: ['@grid', '@p', '@r', 'clip-path', 'polygon()', 'transition'],
  docs: ['pages/css-doodle-com.md', 'pages/css-doodle-com/reference/function-p.md', 'pages/css-doodle-com/reference/property-grid.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
