// Vizzu example: animate() returns a promise, so states chain with .then()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Promise chain',
  summary:
    'animate() returns a promise that resolves when the animation has finished, so a chain of .then() calls plays states one after another. Here a column chart becomes a stacked chart, then a grouped one, each call starting when the last one ends.',
  section: 'Basic logic',
  tags: ['animate', 'Promise', 'then'],
  docs: [
    'repo/docs/tutorial/index.md',
    'repo/docs/tutorial/assets/setup/setup_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
