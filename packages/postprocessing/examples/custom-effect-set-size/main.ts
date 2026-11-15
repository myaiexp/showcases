// Overriding setSize(): the effect learns the frame buffer size whenever the composer resizes
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { MosaicEffect } from './MosaicEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const mosaic = new MosaicEffect(20);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, mosaic));

  const label = stage.bar ? readout(stage.box) : overlay(stage.box);
  const show = (): void => {
    const cells = mosaic.uniforms.get('cells')!.value as { x: number; y: number };
    label.textContent = `setSize(${mosaic.lastSize.x}, ${mosaic.lastSize.y}) call ${mosaic.calls}\ntile ${mosaic.tile}px -> cells ${cells.x} x ${cells.y}`;
  };
  show();
  if (stage.bar) {
    slider(stage.bar, 'tile px', 4, 64, 1, 20, (v) => {
      mosaic.setTile(v);
      show();
    });
    // The stage watches the canvas: a new CSS height resizes the composer, which calls setSize().
    slider(stage.bar, 'canvas height', 200, 560, 10, 420, (v) => {
      stage.canvas.style.height = `${v}px`;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
    show();
  });
  return () => stage.dispose();
};

export default mount;
