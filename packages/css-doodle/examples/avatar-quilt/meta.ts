// Quilt avatars: @once.doodle draws a quarter, scale mirrors it four ways
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quilt avatars',
  summary:
    'The avatars guide\'s quilt: @once.doodle draws one random quarter (a 2 × 2 grid of triangles in colours from @palette), and the outer 2 × 2 grid shows it four times, flipped with scale by the sign of each cell\'s @dx and @dy. Each name gives its own palette and quarter.',
  section: 'Avatars',
  tags: ['@once', '@doodle', '@palette', '@seed', '@dx', '@dy', 'sign()'],
  docs: ['pages/css-doodle-com/avatars.md', 'pages/css-doodle-com/reference/function-doodle.md', 'pages/css-doodle-com/reference/function-palette.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
