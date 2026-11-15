// Vizzu example: options.coordSystem and options.geometry time polar and shape changes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timing the coordinate system and geometry',
  summary:
    'Going polar is a coordinate system change and switching columns to circles is a geometry change. Each has an animation group: coordSystem takes 3 seconds, then geometry takes 3 seconds after waiting for it.',
  section: 'Animation options',
  tags: ['animate', 'options', 'coordSystem', 'geometry', 'polar'],
  docs: [
    'repo/docs/tutorial/animation_options.md',
    'repo/docs/tutorial/animation_options/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
    'repo/docs/tutorial/orientation_split_polar.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
