// Spark example: SplatMesh.objectModifiers with a hand-built dynoBlock twist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Object-space modifier: a twist',
  summary:
    'A striped pillar run through an entry in SplatMesh.objectModifiers: a dynoBlock that rotates each splat’s centre and orientation about Y by an angle proportional to its height. The twist amount is a dynoFloat uniform on a slider; the checkbox swaps the modifier list and calls updateGenerator() to rebuild the pipeline.',
  section: 'SplatMesh',
  tags: ['objectModifiers', 'GsplatModifier', 'dynoBlock', 'updateGenerator', 'transformPos', 'transformQuat'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/dyno-overview.md', 'repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
