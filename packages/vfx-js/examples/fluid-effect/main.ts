// VFX-JS: FluidEffect, a pointer-driven fluid that stirs the picture
import { VFX } from '@vfx-js/core';
import { FluidEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the picture.' });
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The effect reads ctx.mouse (a window pointermove) and tracks the pointer's motion
  // itself: motion adds velocity and dye, and the velocity field carries the picture.
  const fluid = new FluidEffect({ curlStrength: 18 });
  await vfx.add(img, { effect: fluid });
  // Cards have no pointer; this one drives a figure-eight until the reader's pointer arrives.
  standInPointer(stage, img);

  const p = fluid.params;
  if (stage.bar) {
    paramSliders(stage.bar, p, [
      ['curlStrength', 0, 40, 1],
      ['splatForce', 1000, 12000, 100],
      ['velocityDissipation', 0, 2, 0.05],
      ['densityDissipation', 0, 2, 0.05],
    ]);
    checkbox(stage.bar, 'showDye', p.showDye, (v) => (p.showDye = v));
    stage.say('The pointer\'s motion pushes the simulated fluid, and the fluid drags the picture along.');
  } else {
    stage.say('a stand-in pointer stirs the picture');
  }
  return () => stage.dispose();
};

export default mount;
