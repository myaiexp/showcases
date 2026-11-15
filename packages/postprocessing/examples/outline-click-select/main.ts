// OutlineEffect with click-to-select: a Raycaster toggles objects in the Selection
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import { Raycaster, Vector2 } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay } from '../../shared/controls.ts';
import { outlineScene } from '../../shared/outline.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const outline = new OutlineEffect(stage.scene, stage.camera, { edgeStrength: 4, visibleEdgeColor: 0xffd23d, blur: true });
  composer.addPass(new EffectPass(stage.camera, outline));
  const { selection } = outline;

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = stage.preview ? `selection.size ${selection.size}` : `click an object to toggle it, selection.size ${selection.size}`;
  };
  note();

  if (stage.bar) {
    const ray = new Raycaster();
    const ndc = new Vector2();
    let down: [number, number] | null = null;
    const onDown = (e: PointerEvent): void => {
      down = [e.clientX, e.clientY];
    };
    const onUp = (e: PointerEvent): void => {
      // A drag orbits the camera; only a still press selects.
      if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 4) return;
      const r = stage.canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      ray.setFromCamera(ndc, stage.camera);
      const hit = ray.intersectObjects(subject.all, false)[0];
      if (hit) selection.toggle(hit.object);
      note();
    };
    stage.canvas.addEventListener('pointerdown', onDown);
    stage.canvas.addEventListener('pointerup', onUp);
    stage.onDispose(() => {
      stage.canvas.removeEventListener('pointerdown', onDown);
      stage.canvas.removeEventListener('pointerup', onUp);
    });
    button(stage.bar, 'clear', () => {
      selection.clear();
      note();
    });
  } else {
    // Cards stand in for clicks: toggle one object every second.
    let i = 0;
    stage.every(900, () => {
      selection.toggle(subject.all[i++ % subject.all.length]!);
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
