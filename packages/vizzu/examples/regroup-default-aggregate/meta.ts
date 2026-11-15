// Vizzu example: adding and removing dimensions at once, with the default regroupStrategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Regroup: aggregate then drill down",
  summary:
    "Here Kinds leaves the y-axis while Genres comes back on x. The markers cannot just move, so by default they are first merged into their common base and then split again into the target.",
  section: "Changing dimensions",
  tags: ['detach','set','regroupStrategy','aggregate'],
  docs: [
    'repo/docs/tutorial/changing_dimensions.md',
    'repo/docs/tutorial/changing_dimensions/01.js',
    'repo/docs/tutorial/changing_dimensions/02_a.js',
    'repo/docs/tutorial/changing_dimensions/02_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
