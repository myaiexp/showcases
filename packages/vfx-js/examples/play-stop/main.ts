// VFX-JS example: vfx.stop() halts rendering, vfx.play() resumes it
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('portrait', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, { shader: 'rgbGlitch' });

  let playing = true;
  const toggle = (): void => {
    playing = !playing;
    if (playing) vfx.play();
    else vfx.stop(); // the last frame stays on the canvas
    stage.say(playing ? 'vfx.play(): rendering' : 'vfx.stop(): no frames are drawn');
  };
  if (stage.bar) button(stage.bar, 'Stop / play', toggle);
  else stage.every(2000, toggle);
  stage.say('vfx.play(): rendering');
  return () => stage.dispose();
};

export default mount;
