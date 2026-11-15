// Vizzu example: regroupStrategy: 'fade' on an animation that swaps one dimension for another
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Regroup: fade',
  summary:
    'With regroupStrategy "fade" the markers do not split or merge: the old chart fades out while the new one fades in. It suits changes where moving markers would say nothing.',
  section: 'Changing dimensions',
  tags: ['regroupStrategy', 'fade', 'detach', 'attach'],
  docs: [
    'repo/docs/tutorial/changing_dimensions.md',
    'repo/docs/tutorial/changing_dimensions/04_a.js',
    'repo/docs/tutorial/changing_dimensions/04_b.js',
    'repo/docs/assets/data/music_data.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/src/apps/weblib/typeschema-api/anim.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
