// GodRaysEffect: a light that sweeps behind the pillars, so the shafts come and go
import { EffectComposer, EffectPass, GodRaysEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { sunScene, SUN_STAGE } from '../../shared/sun.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, SUN_STAGE);
  const subject = sunScene(stage.scene, { drift: 7 });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The effect projects the mesh's world position every frame, so moving the mesh moves the rays.
  // Where a pillar or the ring hides it in the depth buffer, the light drops out of the beams.
  const rays = new GodRaysEffect(stage.camera, subject.sun, { exposure: 0.8, weight: 0.5 });
  composer.addPass(new EffectPass(stage.camera, rays));

  let auto = true;
  let manual = 0;
  if (stage.bar) {
    checkbox(stage.bar, 'auto sweep', true, (on) => (auto = on));
    slider(stage.bar, 'sun x', -9, 9, 0.1, 0, (v) => {
      manual = v;
      auto = false;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    subject.sun.position.y = 3.4 + Math.sin(t * 0.8) * 1.2;
    if (!auto) subject.sun.position.x = manual;
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
