// Vizzu example: the geometry property: area, line, circle and rectangle on the same data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Four geometries',
  summary:
    'The same two series (Genres on x, Popularity on y) drawn as area, line, circle and rectangle just by changing config.geometry. Vizzu morphs one shape into the next. Rectangle is the default.',
  section: 'Geometry',
  tags: ['geometry', 'area', 'line', 'circle', 'rectangle'],
  docs: [
    'repo/docs/tutorial/geometry.md',
    'repo/docs/tutorial/geometry/01.js',
    'repo/docs/tutorial/geometry/02_a.js',
    'repo/docs/tutorial/geometry/02_b.js',
    'repo/docs/tutorial/geometry/03_a.js',
    'repo/docs/tutorial/geometry/03_b.js',
    'repo/docs/tutorial/geometry/04_a.js',
    'repo/docs/tutorial/geometry/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
