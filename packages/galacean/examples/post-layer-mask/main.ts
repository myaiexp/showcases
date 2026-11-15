// PostProcess.layer with Camera.postProcessMask selects which volumes apply
import { BloomEffect, Layer, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const CHOICES = ['Layer1', 'Layer2', 'Nothing'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { hint: 'Layer1 volume tints the bloom red, Layer2 blue.' });
  const say = caption(stage);
  const add = (name: string, layer: Layer, tint: [number, number, number]): void => {
    const post = root.createChild(name).addComponent(PostProcess);
    post.layer = layer;
    const bloom = post.addEffect(BloomEffect);
    bloom.threshold.value = 0.4;
    bloom.intensity.value = 2.5;
    bloom.tint.value.set(...lin(tint), 1);
  };
  add('red', Layer.Layer1, [1, 0.25, 0.2]);
  add('blue', Layer.Layer2, [0.25, 0.4, 1]);
  const set = (choice: (typeof CHOICES)[number]): void => {
    camera.postProcessMask = Layer[choice];
    say(`camera.postProcessMask = Layer.${choice}`);
  };
  if (stage.preview) steps(root, 2.4, CHOICES.length, (i) => set(CHOICES[i]!));
  else {
    set('Layer1');
    select(stage.bar, 'postProcessMask', CHOICES, set);
  }
  return stage.dispose;
};

export default mount;
