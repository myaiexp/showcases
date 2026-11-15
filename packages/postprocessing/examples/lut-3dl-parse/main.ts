// Generated .3dl text parsed by LUT3dlLoader into a LookupTexture for LUT3DEffect
import { EffectComposer, EffectPass, LUT3DEffect, LUT3dlLoader, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, overlay, readout } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { grades, gradeNames, threeDlText, type GradeName } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const loader = new LUT3dlLoader();
  let lut = loader.parse(threeDlText(16, grades.neutral));
  stage.onDispose(() => lut.dispose());
  const effect = new LUT3DEffect(lut);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const info = stage.bar ? readout(stage.box) : null;
  const label = stage.bar ? null : overlay(stage.box, '');
  const apply = (name: GradeName): void => {
    const text = threeDlText(16, grades[name]);
    const next = loader.parse(text);
    effect.lut = next;
    lut.dispose();
    lut = next;
    if (info) info.textContent = `${text.split('\n').slice(0, 5).join('\n')}\n...\nparsed: ${next.image.width}^3 entries`;
    if (label) label.textContent = `.3dl: ${name}`;
  };
  if (stage.bar) select(stage.bar, 'grade', gradeNames, apply, 'neutral');
  let shown = '';

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const name = gradeNames[1 + (Math.floor(t / 1.8) % (gradeNames.length - 1))]!;
      if (name !== shown) {
        shown = name;
        apply(name);
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
