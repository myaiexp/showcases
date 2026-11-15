// Vizzu example: options.title, options.legend and options.color time their own parts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timing the title, legend and colours",
  summary:
    "Changing the title text and swapping the colour from Kinds to Genres moves three things: the title, the legend and the marker colours. Each has a group, so the title can fade in fast, the legend after a delay, and the colours last.",
  section: "Animation options",
  tags: ['animate','options','title','legend','color'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
