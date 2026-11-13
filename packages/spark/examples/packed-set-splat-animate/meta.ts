// Spark example: rewriting thousands of splats per frame with needsUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animating with setSplat and needsUpdate',
  summary:
    'A grid of splats is allocated once, then every frame the CPU recomputes each one\'s height and colour, writes it back with PackedSplats.setSplat and flags packedSplats.needsUpdate so the texture is re-uploaded. The label shows the per-frame cost; the slider raises the count to find where the docs\' "thousands to tens of thousands" guidance stops being comfortable.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'setSplat', 'needsUpdate', 'pushSplat', 'SplatMesh'],
  docs: ['repo/docs/docs/packed-splats.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
