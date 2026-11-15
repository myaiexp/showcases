// postprocessing example: two OutlineEffects with separate Selections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: two selections',
  summary:
    'Each OutlineEffect owns a Selection with its own render layer, so one EffectPass can outline the knot and a crate in orange and the three balls in cyan at once. The readout shows the layers the two selections were given.',
  section: 'Outline',
  tags: ['OutlineEffect', 'Selection', 'selection.layer', 'selection.add', 'selection.delete', 'EffectPass'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/core/Selection.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
