// An ASCIIEffect with the default ASCIITexture and a changing cellSize
import { ASCIIEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const SIZES = [8, 12, 16, 24];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // No asciiTexture given: the effect makes the default one and disposes it with itself.
  const ascii = new ASCIIEffect({ cellSize: 16 });
  composer.addPass(new EffectPass(stage.camera, ascii));

  const label = stage.bar ? null : overlay(stage.box, '');
  if (stage.bar) slider(stage.bar, 'cellSize', 4, 40, 2, 16, (v) => (ascii.cellSize = v));
  let step = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const s = Math.floor(t / 1.8) % SIZES.length;
      if (s !== step) {
        step = s;
        ascii.cellSize = SIZES[s]!;
        label.textContent = `cellSize ${SIZES[s]}`;
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
