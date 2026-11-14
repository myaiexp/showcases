// Spark example: generators.snowBox with DEFAULT_RAIN for streaking drops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural rain',
  summary:
    'Rain from generators.snowBox, using the DEFAULT_RAIN parameters: fast falling splats stretched along Y by anisoScale into streaks, clamped at a ground plane with minY. Sliders change density (which rebuilds the generator), fallVelocity, the stretch and the drop size.',
  section: 'Procedural Splats',
  tags: ['generators', 'snowBox', 'DEFAULT_RAIN', 'anisoScale', 'minY', 'fallVelocity'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
