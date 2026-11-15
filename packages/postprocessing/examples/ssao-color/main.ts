// SSAOEffect: color tints the occlusion instead of darkening to black
import { Color } from 'three';
import { EffectComposer, EffectPass, NormalPass, RenderPass, SSAOEffect } from 'postprocessing';
import { overlay, select } from '../../shared/controls.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { room } from '../../shared/scenes.ts';
import { AO_STAGE, sway } from '../../shared/ssao.ts';

const TINTS = { none: null, red: '#c0203a', blue: '#2040d0', green: '#20a050' } as const;
type Tint = keyof typeof TINTS;
const NAMES = Object.keys(TINTS) as Tint[];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AO_STAGE);
  const subject = room(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const normalPass = new NormalPass(stage.scene, stage.camera);
  composer.addPass(normalPass);
  const ssao = new SSAOEffect(stage.camera, normalPass.texture, { intensity: 3.5, luminanceInfluence: 0.3 });
  composer.addPass(new EffectPass(stage.camera, ssao));

  // Setting a colour turns on the COLORIZE define; null turns it off again.
  const label = overlay(stage.box);
  const apply = (name: Tint): void => {
    const c = TINTS[name];
    // The typings declare color as a non-null Color, but null is the documented way to turn it off.
    ssao.color = c === null ? (null as unknown as Color) : new Color(c);
    label.textContent = `color ${name}`;
  };
  apply('red');
  if (stage.bar) select(stage.bar, 'color', NAMES, apply, 'red');
  let step = 0;
  if (!stage.bar) stage.every(2000, () => apply(NAMES[++step % NAMES.length]!));

  stage.run((dt, t) => {
    subject.update(t);
    sway(stage, t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
