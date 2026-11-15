// Vizzu example: channels set with {name} descriptors, which can carry an aggregator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Series descriptor objects',
  summary:
    'A series on a channel can be a name or a descriptor object, and the descriptor can carry an aggregator. The chart first uses plain descriptors, then Kinds on the x-axis with Popularity summed, averaged and taken at its maximum.',
  section: 'Axes, title, tooltip',
  tags: ['channels', 'set', 'SeriesDescriptor', 'aggregator'],
  docs: [
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/tutorial/axes_title_tooltip/01.js',
    'repo/src/apps/weblib/typeschema-api/data.yaml',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
