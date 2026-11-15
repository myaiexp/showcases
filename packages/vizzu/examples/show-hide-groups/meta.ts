// Vizzu example: options.show and options.hide time markers fading in and out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Timing markers that show and hide",
  summary:
    "Filtering out a genre makes its markers fade away, which the hide group times; bringing them back is the show group. Hide gets 2 seconds, and show waits 1 second then takes 2.",
  section: "Animation options",
  tags: ['animate','options','show','hide','filter'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/docs/tutorial/filter_add_new_records.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
