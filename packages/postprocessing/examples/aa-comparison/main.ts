// None, MSAA, FXAA and SMAA on the same frame, swapped by replacing the last pass
import { CopyPass, EffectComposer, EffectPass, FXAAEffect, RenderPass, SMAAEffect, SMAAPreset, type Pass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select } from '../../shared/controls.ts';
import { AA_STAGE, wireCage } from '../../shared/aliasing.ts';

const MODES = ['none', 'MSAA x4', 'FXAA', 'SMAA'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, AA_STAGE);
  stage.renderer.setPixelRatio(1);
  const subject = wireCage(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const passes: Record<Mode, Pass> = {
    none: new CopyPass(),
    'MSAA x4': new CopyPass(),
    FXAA: new EffectPass(stage.camera, new FXAAEffect()),
    SMAA: new EffectPass(stage.camera, new SMAAEffect({ preset: SMAAPreset.HIGH })),
  };
  for (const pass of Object.values(passes)) stage.own(pass);

  const label = overlay(stage.box);
  let current: Mode = 'none';
  composer.addPass(passes[current]);
  const apply = (mode: Mode): void => {
    // removePass and addPass keep renderToScreen on whichever pass is last.
    composer.removePass(passes[current]);
    composer.addPass(passes[mode]);
    composer.multisampling = mode === 'MSAA x4' ? 4 : 0;
    current = mode;
    label.textContent = mode;
  };
  apply('none');

  if (stage.bar) {
    select(stage.bar, 'antialiasing', MODES, apply, 'none');
  } else {
    let i = 0;
    stage.every(1800, () => apply(MODES[++i % MODES.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
