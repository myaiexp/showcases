// Vizzu example: a plot-marker-label-draw handler highlights the labels of the big values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker label draw event',
  summary:
    "plot-marker-label-draw gives the handler the label's marker through event.target.parent, so the handler can style a label by its marker's data. Labels of markers above 100 turn bold orange; the handler is removed again at the end.",
  section: 'Events',
  tags: ['on', 'off', 'plot-marker-label-draw', 'renderingContext', 'event.target.parent'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
