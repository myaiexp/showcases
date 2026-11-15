// A 4x4x4 LookupTexture scaled up in a worker, then swapped in against the coarse one
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, overlay, readout } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const SIZES = ['8', '16', '32', '64'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const small = stage.own(LookupTexture.createNeutral(4));
  fillLut(small, grades['teal and orange']);
  const effect = new LUT3DEffect(small);
  let big: LookupTexture | null = null;
  let alive = true;
  stage.onDispose(() => {
    alive = false;
    big?.dispose();
  });

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const info = stage.bar ? readout(stage.box, 'LUT: 4^3 original') : null;
  const label = stage.bar ? null : overlay(stage.box, 'scaling up...');
  let showBig = false;
  const scale = (size: number): void => {
    const started = performance.now();
    // false: keep the original data (the default transfers it to the worker and empties it).
    small.scaleUp(size, false).then((lut) => {
      if (!alive) return lut.dispose();
      const old = big;
      big = lut;
      effect.lut = lut;
      old?.dispose();
      showBig = true;
      if (info) info.textContent = `LUT: scaled to ${size}^3 in ${(performance.now() - started).toFixed(0)} ms`;
    });
  };
  if (stage.bar) {
    select(stage.bar, 'scale up to', SIZES, (v) => scale(Number(v)), '8');
    scale(8);
  } else {
    scale(32);
    stage.every(2000, () => {
      if (!big) return;
      showBig = !showBig;
      effect.lut = showBig ? big : small;
      if (label) label.textContent = showBig ? '32^3 (scaleUp)' : '4^3 original';
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
