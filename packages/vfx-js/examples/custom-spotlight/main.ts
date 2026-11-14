// an effect that outputs the whole canvas and follows ctx.mouseViewport
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { createStage } from '../../shared/stage.ts';
import { SpotlightEffect } from './spotlight-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the stage' });
  const img = await picture('portrait', ctx.preview ? 130 : 300);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const light = new SpotlightEffect({ radius: ctx.preview ? 50 : 90 });
  await vfx.add(img, { effect: light });

  standInPointer(stage, stage.root);
  if (stage.bar) {
    slider(stage.bar, 'params.radius', 20, 240, 5, light.params.radius, (v) => (light.params.radius = v), (v) => `${v}px`);
  }
  stage.say('outputRect returns dims.canvasRect, so the glow follows the pointer past the picture, anywhere on the canvas (clipped to this stage).');
  return () => stage.dispose();
};

export default mount;
