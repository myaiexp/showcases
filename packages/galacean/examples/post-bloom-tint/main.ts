// BloomEffect.tint colours the bloom
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'tint is a colour parameter: bloom.tint.value.' });
  caption(stage, 'bloom.tint');
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 2.5;
  if (stage.preview) tick(root, (_dt, t) => bloom.tint.value.set(...lin([0.6 + 0.4 * Math.sin(t), 0.6 + 0.4 * Math.sin(t + 2.1), 0.6 + 0.4 * Math.sin(t + 4.2)]), 1));
  else color(stage.bar, 'tint', [1, 0.4, 0.4], (c) => bloom.tint.value.set(...lin(c), 1));
  return stage.dispose;
};

export default mount;
