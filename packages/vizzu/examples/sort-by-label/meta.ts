// Vizzu example: sort: "byLabel" orders categories alphabetically
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sort by label',
  summary:
    'byLabel sorts by the category names themselves, not by the values: Jazz, Metal, Pop, Rock. Adding reverse: true gives Z to A. The config reference describes it as ASCII case-insensitive and space-insensitive, with numbers compared by value.',
  section: 'Sorting',
  tags: ['sort', 'byLabel', 'reverse', 'channels'],
  docs: [
    'repo/docs/tutorial/sorting.md',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_b.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
