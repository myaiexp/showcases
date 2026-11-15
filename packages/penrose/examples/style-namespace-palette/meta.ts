// penrose example: A palette namespace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A palette namespace read with the dot',
  summary:
    'A `palette` namespace holds colours and a `sizes` namespace holds numbers. Selector blocks read them as `palette.fill` and `sizes.radius`, so changing one line in a namespace restyles every set. The tabs swap the namespaces only.',
  section: 'Style: Namespaces',
  tags: ['namespace', 'dot operator', 'global variables', 'rgba'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/namespaces.md',
    'repo/packages/docs-site/docs/ref/style/overview.md',
    'repo/packages/core/src/lib/Constraints.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
