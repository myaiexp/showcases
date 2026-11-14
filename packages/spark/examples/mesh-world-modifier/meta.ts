// Spark example: SplatMesh.worldModifiers, two modifiers applied in sequence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World-space modifiers in sequence',
  summary:
    'A knot slides left and right through two chained modifiers: a ripple that lifts splats by a fixed wave of their X, and a band that paints low splats blue. In worldModifiers the wave stays put while the knot moves through it; as objectModifiers it rides along. Swapping the order shows the second modifier sees the first one’s output.',
  section: 'SplatMesh',
  tags: ['worldModifiers', 'objectModifiers', 'GsplatModifier', 'updateGenerator', 'combineGsplat'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
