// penrose example: in [stage, stage]: an unknown in two stages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'in [stage, stage]: an unknown in two stages',
  summary:
    'Like the blog\'s `b = ? in [shape, overall]`: a value may belong to several stages. Points are `in [shape, overall]` and label centres `in [label, overall]`, so in the final `overall` stage everything is movable at once, and an `encourage` pulls the triangle\'s centre to the origin while labels keep their distance.',
  section: 'Layout Stages',
  tags: ['layout', 'in', 'stage', 'overall', 'encourage'],
  docs: ['repo/packages/docs-site/blog/staged-layout.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
