// vfx.add waits for an async init() before the first frame
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { picture, pictureUrl } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { PosterEffect } from './poster-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // Decoding is quick, so init() also waits 1.2 s, standing in for a slow download.
  const run = async (): Promise<void> => {
    stage.say('init() is running: vfx.add() has not resolved, so the picture is still plain HTML.', 'warn');
    const fx = new PosterEffect(pictureUrl('poster'), 1200);
    await vfx.add(img, { effect: fx });
    if (stage.disposed) return;
    stage.say(`vfx.add() resolved after init() (ready: ${fx.ready}); the effect draws from the first frame.`, 'ok');
  };
  const replay = async (): Promise<void> => {
    vfx.remove(img);
    await run();
  };

  void run();
  if (stage.bar) button(stage.bar, 'Remove and add again', () => void replay());
  else stage.every(5000, () => void replay());
  return () => stage.dispose();
};

export default mount;
