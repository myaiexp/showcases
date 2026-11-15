// Camera.enablePostProcess turns every volume on or off for one camera
import { BloomEffect, PostProcess, TonemappingEffect, TonemappingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { hint: 'The volume never changes; only camera.enablePostProcess does.' });
  const say = caption(stage);
  const post = root.createChild('post').addComponent(PostProcess);
  post.addEffect(TonemappingEffect).mode.value = TonemappingMode.ACES;
  const bloom = post.addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 2;
  const set = (on: boolean): void => {
    camera.enablePostProcess = on;
    say(`enablePostProcess = ${on}`);
  };
  if (stage.preview) steps(root, 2.2, 2, (i) => set(i === 0));
  else {
    set(true);
    checkbox(stage.bar, 'camera.enablePostProcess', true, set);
  }
  return stage.dispose;
};

export default mount;
