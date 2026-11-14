// two ctx.draw calls through an intermediate render target
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { BlurEffect } from './blur-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const blur = new BlurEffect({ spread: 2 });
  await vfx.add(img, { effect: blur });

  if (stage.bar) {
    slider(stage.bar, 'params.spread', 0, 4, 0.1, blur.params.spread, (v) => (blur.params.spread = v));
    stage.say('Pass 1 blurs along x into a render target made in init(); pass 2 blurs that along y into ctx.target.');
  } else {
    stage.frame((t) => (blur.params.spread = sweep(t, 0, 3.5, 5)));
    stage.say('Horizontal pass, then vertical pass');
  }
  return () => stage.dispose();
};

export default mount;
