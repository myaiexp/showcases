// The Initializable, Resizable and Disposable contracts an effect or pass implements, in order
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, readout } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { LoggingEffect } from './LoggingEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const effect = new LoggingEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const pass = new EffectPass(stage.camera, effect);
  // addPass initialises the pass: the effect gets setSize() first, then initialize().
  composer.addPass(pass);

  const out = stage.bar ? readout(stage.box) : overlay(stage.box);
  if (out instanceof HTMLDivElement && stage.bar) out.style.padding = '8px 4px';
  let disposed = false;
  if (stage.bar) {
    button(stage.bar, 'resize the canvas', () => {
      const h = stage.canvas.clientHeight;
      stage.canvas.style.height = `${h > 300 ? 260 : 420}px`;
    });
    button(stage.bar, 'remove and dispose the pass', () => {
      if (disposed) return;
      disposed = true;
      composer.removePass(pass);
      pass.dispose();
    });
  } else {
    // Cards nudge the composer size now and then so setSize() keeps showing up in the log.
    let wide = false;
    stage.every(2200, () => {
      wide = !wide;
      composer.setSize(stage.size.width - (wide ? 40 : 0), stage.size.height, false);
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
    const lines = effect.log.slice(stage.preview ? -4 : -12);
    out.textContent = `${lines.join('\n')}\nupdate() calls: ${effect.updates}`;
  });
  return () => stage.dispose();
};

export default mount;
