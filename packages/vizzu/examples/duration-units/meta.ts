// Vizzu example: a duration is seconds by default; strings add a unit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Duration in seconds or milliseconds',
  summary:
    'A bare number is seconds. The strings "500ms" and "2s" set the unit, and passing just a duration as the second argument is a shorter form of { duration }. The four steps use each form.',
  section: 'Animation options',
  tags: ['animate', 'options', 'duration', 'ms'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/06_a.js',
    'repo/docs/tutorial/animation_options/06_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
