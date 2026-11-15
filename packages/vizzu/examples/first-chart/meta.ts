// Vizzu example: the tutorial's first two chart states, animated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A first chart',
  summary:
    'A Vizzu chart is a series of states. The first animate() call hands over the data and puts Genres on the x-axis and Popularity on the y-axis. The second describes the next state, Kinds stacked and coloured, and Vizzu animates each column into its new shape.',
  section: 'Basic logic',
  tags: ['animate', 'data', 'config', 'channels'],
  docs: [
    'repo/docs/tutorial/index.md',
    'repo/docs/tutorial/assets/setup/setup_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
