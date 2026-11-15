// An identity .cube table with a DOMAIN_MAX below 1, parsed and applied by LUT3DEffect
import { EffectComposer, EffectPass, LUT3DEffect, LUTCubeLoader, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, overlay, readout } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { grades, cubeText } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const loader = new LUTCubeLoader();
  let lut = loader.parse(cubeText(16, grades.neutral, 'domain', 0.6));
  stage.onDispose(() => lut.dispose());
  const effect = new LUT3DEffect(lut);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const info = stage.bar ? readout(stage.box) : null;
  const label = stage.bar ? null : overlay(stage.box, '');
  const setMax = (max: number): void => {
    // The domain is baked into the text; parse again and swap the effect's lut.
    const next = loader.parse(cubeText(16, grades.neutral, 'domain', max));
    effect.lut = next;
    lut.dispose();
    lut = next;
    const text = `DOMAIN_MAX ${lut.domainMax.x.toFixed(2)}`;
    if (info) info.textContent = text;
    if (label) label.textContent = text;
  };
  if (stage.bar) slider(stage.bar, 'DOMAIN_MAX', 0.2, 1, 0.01, 0.6, setMax);
  let last = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const step = Math.floor(t * 4);
      if (step !== last) {
        last = step;
        setMax(0.4 + 0.5 * (0.5 + 0.5 * Math.sin(step * 0.25)));
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
