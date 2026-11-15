// SelectiveBloomEffect: only the objects in its Selection glow
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
  const meshes = subject.group.children.filter((c): c is Mesh => (c as Mesh).isMesh);
  const rings = meshes.filter((m) => m.geometry.type === 'TorusGeometry');
  const pillars = meshes.filter((m) => m.geometry.type === 'CylinderGeometry');

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // Threshold 0 lets every pixel through the luminance filter, so the Selection alone decides.
  const bloom = new SelectiveBloomEffect(stage.scene, stage.camera, {
    luminanceThreshold: 0,
    luminanceSmoothing: 0,
    intensity: 2,
  });
  composer.addPass(new EffectPass(stage.camera, bloom));
  const { selection } = bloom;
  selection.set(rings);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `selection.size ${selection.size}`;
  };
  note();

  if (stage.bar) {
    checkbox(stage.bar, 'rings', true, (on) => {
      for (const m of rings) on ? selection.add(m) : selection.delete(m);
      note();
    });
    checkbox(stage.bar, 'pillars', false, (on) => {
      for (const m of pillars) on ? selection.add(m) : selection.delete(m);
      note();
    });
  } else {
    let on = false;
    stage.every(2000, () => {
      on = !on;
      for (const m of pillars) on ? selection.add(m) : selection.delete(m);
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
