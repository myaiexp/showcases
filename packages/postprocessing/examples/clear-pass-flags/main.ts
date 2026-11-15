// ClearPass colour and depth flags: what a frame looks like when each buffer is left uncleared
import { ClearPass, CopyPass, EffectComposer, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const COMBOS: [color: boolean, depth: boolean][] = [
  [true, true],
  [false, true],
  [true, false],
  [false, false],
];

const mount: Mount = (el, ctx) => {
  // No scene background: a background would paint over the colour buffer and hide the effect.
  const stage = createStage(el, ctx, { background: null, orbit: 0.5 });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  const clearPass = new ClearPass(true, true, false);
  composer.addPass(clearPass);
  const renderPass = new RenderPass(stage.scene, stage.camera);
  renderPass.clearPass.enabled = false;
  composer.addPass(renderPass);
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const set = (color: boolean, depth: boolean): void => {
    clearPass.setClearFlags(color, depth, false);
    label.textContent = `ClearPass(color ${color}, depth ${depth}, stencil false)`;
  };
  set(true, true);
  if (stage.bar) {
    let flags = { color: true, depth: true };
    const apply = (): void => set(flags.color, flags.depth);
    checkbox(stage.bar, 'clear color', true, (v) => ((flags = { ...flags, color: v }), apply()));
    checkbox(stage.bar, 'clear depth', true, (v) => ((flags = { ...flags, depth: v }), apply()));
  } else {
    let i = 0;
    stage.every(2500, () => set(...COMBOS[++i % COMBOS.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
