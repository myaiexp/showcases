// ctx.uniforms in an effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ctx.uniforms from vfx.add',
  summary:
    'The uniforms option of vfx.add works with effects too: the values, or functions returning them, are evaluated every frame and the effect reads them from ctx.uniforms. A colour and a strength set in main.ts tint the picture without the effect knowing where they come from.',
  section: 'Custom Effects',
  tags: ['ctx.uniforms', 'uniforms', 'vfx.add', 'EffectUniformValue', 'getter'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
