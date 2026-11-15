// penrose example: nearVec: the offset that does nothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "nearVec: the offset that does nothing",
  summary:
    'The blue circle is fixed. `encourage nearVec(a.icon.center, b.icon.center, offset)` is documented as keeping the two points `offset` apart, but 3.3.1 minimises the squared distance minus offset squared, which is lowest at distance zero. The orange dot lands on the centre for any offset.',
  section: "Objective Functions",
  tags: ['nearVec', 'encourage', 'objective', 'distance'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/functions.md',
    'repo/packages/core/src/lib/Objectives.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
