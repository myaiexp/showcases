// SelectiveBloomEffect inverted and ignoreBackground: bloom everything except the selection
import { HalfFloatType, type Mesh } from 'three';
import { EffectComposer, EffectPass, RenderPass, SelectiveBloomEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { neon } from '../../shared/scenes.ts';
import { NEON_STAGE } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, NEON_STAGE);
  const subject = neon(stage.scene);
  const rings = subject.group.children.filter((c): c is Mesh => (c as Mesh).isMesh && (c as Mesh).geometry.type === 'TorusGeometry');

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const bloom = new SelectiveBloomEffect(stage.scene, stage.camera, { intensity: 2 });
  composer.addPass(new EffectPass(stage.camera, bloom));
  bloom.selection.set(rings);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `inverted ${bloom.inverted}, ignoreBackground ${bloom.ignoreBackground}`;
  };
  note();

  if (stage.bar) {
    // Inverted: the selected rings are the only things that do not bloom.
    checkbox(stage.bar, 'inverted', false, (v) => ((bloom.inverted = v), note()));
    // Ignoring the background keeps the sky (and anything at max depth) out of the glow.
    checkbox(stage.bar, 'ignoreBackground', false, (v) => ((bloom.ignoreBackground = v), note()));
  } else {
    let on = false;
    stage.every(2000, () => {
      on = !on;
      bloom.inverted = on;
      note();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
