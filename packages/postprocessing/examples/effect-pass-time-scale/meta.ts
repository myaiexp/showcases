// postprocessing example: EffectPass.timeScale scales the time uniform of one pass
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EffectPass: timeScale',
  summary:
    'Every EffectPass owns the `time` uniform its effects read, advanced by deltaTime times its `timeScale`. Two passes run here, one with stripes and one with rolling scan lines, and each timeScale can be set separately: 0 freezes that pass\'s animation, the other keeps moving. In cards the two scales swing in opposite directions.',
  section: 'Utilities',
  tags: ['EffectPass', 'timeScale', 'time', 'ScanlineEffect', 'Effect'],
  docs: ['repo/README.md', 'repo/src/passes/EffectPass.js', 'repo/src/materials/glsl/effect.frag', 'repo/src/effects/ScanlineEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
