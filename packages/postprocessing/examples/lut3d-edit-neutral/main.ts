// A neutral 16^3 LookupTexture whose data is rewritten with a grade and fed to LUT3DEffect
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { grades, gradeNames, type GradeName } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const lut = stage.own(LookupTexture.createNeutral(16));
  const base = (lut.image.data as Float32Array).slice();
  const grade = (name: GradeName): void => {
    // Each entry is RGBA; the neutral values are the input colour of that grid point.
    const data = lut.image.data as Float32Array;
    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b] = grades[name](base[i]!, base[i + 1]!, base[i + 2]!);
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
    lut.needsUpdate = true;
  };

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new LUT3DEffect(lut)));

  let label: HTMLElement | null = null;
  let shown = '';
  if (stage.bar) {
    select(stage.bar, 'grade', gradeNames, grade, 'neutral');
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const name = gradeNames[Math.floor(t / 1.8) % gradeNames.length]!;
      if (name !== shown) {
        shown = name;
        grade(name);
        label.textContent = name;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
