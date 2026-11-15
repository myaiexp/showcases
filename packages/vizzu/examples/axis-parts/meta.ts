// Vizzu example: axis, labels, ticks, interlacing, guides and markerGuides, one at a time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parts of an axis',
  summary:
    'Each axis channel has six switches. axis, labels, ticks and interlacing are on by default for a measure axis, guides are off for a dimension axis, and markerGuides are off for a measure axis. The story flips one at a time (the axis line and ticks are drawn in a faint grey here, so those two are subtle).',
  section: 'Axes, title, tooltip',
  tags: ['axis', 'labels', 'ticks', 'interlacing', 'guides', 'markerGuides'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
