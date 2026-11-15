// Vizzu example: regroupStrategy: 'drilldown' on an animation that swaps one dimension for another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regroup: drill down first',
  summary:
    'Swapping Genres for Kinds on the x-axis with regroupStrategy "drilldown" first splits the markers into the union of both states, then merges them into the target. It is the opposite order to the default.',
  section: 'Changing dimensions',
  tags: ['regroupStrategy', 'drilldown', 'detach', 'attach'],
  docs: [
    'repo/docs/tutorial/changing_dimensions.md',
    'repo/docs/tutorial/changing_dimensions/03_a.js',
    'repo/docs/tutorial/changing_dimensions/03_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
