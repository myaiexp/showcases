// enabled versus vfx.updateEffects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'enabled versus updateEffects',
  summary:
    'Two ways to change a chain. Setting enabled to false skips render() but keeps the effect, its buffers and its update() calls; updateEffects swaps the list, keeping instances that stay in it and disposing the ones that leave. Counters show which hooks run.',
  section: 'Custom Effects',
  tags: ['enabled', 'vfx.updateEffects', 'init', 'update', 'dispose', 'persistent', 'chain'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
