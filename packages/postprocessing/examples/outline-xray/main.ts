// OutlineEffect xRay and hiddenEdgeColor: outlines of the parts behind a wall
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, select } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const HIDDEN = { red: 0xff3355, 'default (dark)': 0x22090a, blue: 0x3a7bff, yellow: 0xffd23d } as const;

const mount: Mount = (el, ctx) => {
  // A fixed camera: the wall hides most of the knot from here.
  const stage = createStage(el, ctx, { orbit: false, position: [0, 2.2, 7], target: [0, 1.1, 0] });
  const subject = outlineScene(stage.scene, { wall: true });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 4, visibleEdgeColor: 0xffffff, hiddenEdgeColor: HIDDEN.red, xRay: true });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set([subject.knot]);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `xRay = ${outline.xRay}`;
  };
  note();
  if (stage.bar) {
    checkbox(stage.bar, 'xRay', true, (on) => ((outline.xRay = on), note()));
    select(stage.bar, 'hiddenEdgeColor', Object.keys(HIDDEN) as (keyof typeof HIDDEN)[], (c) => outline.hiddenEdgeColor.set(HIDDEN[c]), 'red');
  } else {
    stage.every(2200, () => {
      outline.xRay = !outline.xRay;
      note();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
