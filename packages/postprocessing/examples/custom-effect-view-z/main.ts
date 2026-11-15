// getViewZ and PERSPECTIVE_CAMERA: one depth effect, two camera types
import { OrthographicCamera } from 'three';
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { corridor } from '../../shared/scenes.ts';
import { BandsEffect } from './BandsEffect.ts';

const kinds = ['perspective', 'orthographic'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 1.4, 6], target: [0, 1.2, -10], near: 0.3, far: 60 });
  const subject = corridor(stage.scene);

  const ortho = new OrthographicCamera(-4, 4, 2.5, -2.5, 0.3, 60);
  ortho.position.set(0, 1.4, 6);
  ortho.lookAt(0, 1.2, -10);

  const effects = [new BandsEffect(), new BandsEffect()];
  // Each EffectPass gets its own camera, which is how it learns the camera type and near/far.
  const build = (camera: typeof stage.camera | OrthographicCamera, effect: BandsEffect): EffectComposer => {
    const composer = stage.own(new EffectComposer(stage.renderer));
    composer.addPass(new RenderPass(stage.scene, camera));
    composer.addPass(new EffectPass(camera, effect));
    return composer;
  };
  const composers = { perspective: build(stage.camera, effects[0]!), orthographic: build(ortho, effects[1]!) };

  let kind: (typeof kinds)[number] = 'perspective';
  const label = overlay(stage.box);
  const show = (k: (typeof kinds)[number]): void => {
    kind = k;
    label.textContent = `${k} camera: bands every 3 units of view distance`;
  };
  show(kind);
  if (stage.bar) {
    select(stage.bar, 'camera', kinds, show);
    slider(stage.bar, 'spacing', 1, 8, 0.5, 3, (v) => {
      for (const e of effects) e.spacing = v;
    });
  } else stage.every(3000, () => show(kind === 'perspective' ? 'orthographic' : 'perspective'));

  stage.run((dt, t) => {
    subject.update(t);
    ortho.right = 2.5 * stage.camera.aspect;
    ortho.left = -ortho.right;
    ortho.updateProjectionMatrix();
    composers[kind].render(dt);
  });
  return () => stage.dispose();
};

export default mount;
