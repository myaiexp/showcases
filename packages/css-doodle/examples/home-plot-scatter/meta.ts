// The landing page's @plot doodle: letters scattered inside a curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@shape clips, @plot places',
  summary:
    'The home page\'s last doodle: a 1 × 2400 grid of letters, each placed by @place at a point that @plot.scatter picks inside a curve given as -x and -y formulas of t. @random(.05) turns one cell in twenty into a coloured mark; a new seed scatters them again.',
  section: 'Getting started',
  tags: ['@plot', '.scatter', '@place', '@random', '@content', '@p'],
  docs: ['pages/css-doodle-com.md', 'pages/css-doodle-com/reference/function-plot.md', 'pages/css-doodle-com/reference/property-place.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
