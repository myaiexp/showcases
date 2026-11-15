// OutlineEffect multisampling and resolution scale: smooth or jagged edge lines
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const SAMPLES = ['0', '2', '4', '8'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 5, visibleEdgeColor: 0xffffff, multisampling: 0, resolutionScale: 0.25 });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set([subject.knot, subject.balls[0]!]);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `multisampling ${outline.multisampling}, resolution.scale ${outline.resolution.scale.toFixed(2)}`;
  };
  const apply = (samples: number, scale: number): void => {
    outline.multisampling = samples;
    outline.resolution.scale = scale;
    note();
  };
  apply(0, 0.25);
  if (stage.bar) {
    select(stage.bar, 'multisampling', SAMPLES, (v) => ((outline.multisampling = Number(v)), note()), '0');
    slider(stage.bar, 'resolution.scale', 0.1, 1, 0.05, 0.25, (v) => ((outline.resolution.scale = v), note()));
  } else {
    const steps: [number, number][] = [[0, 0.25], [4, 0.25], [0, 1], [4, 1]];
    let i = 0;
    stage.every(2000, () => apply(...steps[++i % steps.length]!));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
