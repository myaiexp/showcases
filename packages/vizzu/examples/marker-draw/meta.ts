// Vizzu example: a plot-marker-draw handler draws its own shape for every marker and cancels the default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draw your own markers',
  summary:
    "A plot-marker-draw handler gets each marker's bounding rectangle (in plot-relative units, which coordSystem.toCanvas turns into pixels), its categories and a canvas context. Drawing a shape there and calling preventDefault replaces the library's marker; the handler keeps drawing while the chart regroups.",
  section: 'Events',
  tags: ['on', 'off', 'plot-marker-draw', 'preventDefault', 'detail.rect', 'detail.relative', 'coordSystem', 'event.target.categories'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/events/config.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
    'repo/src/apps/weblib/ts-api/plugins/rendercontrol.ts',
    'repo/src/apps/weblib/ts-api/plugins/coordsys.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
