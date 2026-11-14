// createRenderTarget with mipmap true, read at a chosen level
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { LodBlurEffect } from './lod-blur-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new LodBlurEffect({ lod: 3 });
  await vfx.add(img, { effect: fx });

  if (stage.bar) {
    slider(stage.bar, 'params.lod', 0, 7, 0.1, fx.params.lod, (v) => (fx.params.lod = v));
    stage.say('One blit into a mipmapped target, one draw reading it with textureLod: the level picks the blur.');
  } else {
    stage.frame((t) => (fx.params.lod = sweep(t, 0, 6, 6)));
    stage.say('lod swings between 0 and 6');
  }
  return () => stage.dispose();
};

export default mount;
