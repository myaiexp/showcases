// ctx.uniforms carries the uniforms option of vfx.add into an effect
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { colorInput, hexToRgba, readout, slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { TintEffect } from './tint-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('city', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  let tint: [number, number, number] = [1, 0.6, 0.25];
  let strength = 1;
  const fx = new TintEffect();
  // Functions are re-evaluated every frame and arrive in the effect as ctx.uniforms.
  await vfx.add(img, { effect: fx, uniforms: { tint: () => tint, strength: () => strength } });

  if (stage.bar) {
    colorInput(stage.bar, 'tint', '#ff9940', (rgba) => (tint = [rgba[0], rgba[1], rgba[2]]));
    slider(stage.bar, 'strength', 0, 1, 0.01, strength, (v) => (strength = v));
    const show = readout(stage.bar);
    stage.frame(() => show(`ctx.uniforms: tint ${fx.seen.tint.map((n) => n.toFixed(2)).join(', ')} / strength ${fx.seen.strength.toFixed(2)}`));
    stage.say('Both values live in main.ts as getter functions; the effect only ever reads them from ctx.uniforms.');
  } else {
    stage.frame((t) => {
      tint = [hexToRgba('#ff9940')[0], 0.5 + 0.5 * Math.sin(t), 0.4 + 0.4 * Math.sin(t * 0.7 + 2)];
      strength = sweep(t, 0.3, 1, 4);
    });
    stage.say('uniforms getters feed ctx.uniforms');
  }
  return () => stage.dispose();
};

export default mount;
