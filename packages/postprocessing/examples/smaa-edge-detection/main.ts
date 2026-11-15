// SMAA EdgeDetectionMode: depth, luma or colour edges, shown as the edges texture
import { EdgeDetectionMode, EffectComposer, EffectPass, RenderPass, SMAAEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { AA_STAGE, addSmaaView, wireCage, type SmaaView } from '../../shared/aliasing.ts';

const MODES = { DEPTH: EdgeDetectionMode.DEPTH, LUMA: EdgeDetectionMode.LUMA, COLOR: EdgeDetectionMode.COLOR };
type Name = keyof typeof MODES;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const smaa = new SMAAEffect({ edgeDetectionMode: EdgeDetectionMode.COLOR });
  const smaaPass = new EffectPass(stage.camera, smaa);
  composer.addPass(smaaPass);
  const show = addSmaaView(composer, stage.camera, smaaPass, smaa);
  show('edges');

  const label = overlay(stage.box);
  const apply = (name: Name): void => {
    smaa.edgeDetectionMaterial.edgeDetectionMode = MODES[name];
    label.textContent = `EdgeDetectionMode.${name}`;
  };
  apply('COLOR');

  const names = Object.keys(MODES) as Name[];
  if (stage.bar) {
    select(stage.bar, 'mode', names, apply, 'COLOR');
    select(stage.bar, 'show', ['edges', 'result'] as SmaaView[], show, 'edges');
  } else {
    let i = 0;
    stage.every(1800, () => apply(names[++i % names.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
