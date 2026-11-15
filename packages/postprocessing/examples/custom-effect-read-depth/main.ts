// readDepth(uv) samples depth at other coordinates: a custom depth-edge line effect
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';
import { DepthEdgeEffect } from './DepthEdgeEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { near: 0.5, far: 40 });
  const subject = showroom(stage.scene);

  const edges = new DepthEdgeEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, edges));

  const update = tune(stage, [
    { name: 'sensitivity', min: 0.5, max: 12, step: 0.1, value: 4, digits: 1, set: (v) => (edges.sensitivity = v), sweep: [1, 9, 6] },
  ]);

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
