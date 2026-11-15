// PostProcess.addEffect(BloomEffect) on a camera with enablePostProcess and HDR
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'camera.enablePostProcess = true, camera.enableHDR = true; the volume is global.' });
  const say = caption(stage);
  const post = root.createChild('post').addComponent(PostProcess);
  const bloom = post.addEffect(BloomEffect);
  bloom.intensity.value = 1.5;
  bloom.threshold.value = 0.5;
  const set = (on: boolean): void => {
    bloom.enabled = on;
    say(on ? 'BloomEffect on' : 'BloomEffect off');
  };
  if (stage.preview) steps(root, 2.2, 2, (i) => set(i === 0));
  else {
    set(true);
    checkbox(stage.bar, 'bloom.enabled', true, set);
  }
  return stage.dispose;
};

export default mount;
