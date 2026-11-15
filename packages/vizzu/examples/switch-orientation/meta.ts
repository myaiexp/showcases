// Vizzu example: moving the measure from the y-axis to the x-axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switch the orientation',
  summary:
    'Detaching Popularity from y and attaching it to x lays the chart on its side: one horizontal bar per kind, with the genres stacked along it. The docs call this a state to use only for a moment, to see the data from another side.',
  section: 'Orientation, split & polar',
  tags: ['detach', 'attach', 'orientation', 'channels'],
  docs: [
    'repo/docs/tutorial/orientation_split_polar.md',
    'repo/docs/tutorial/orientation_split_polar/01.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
