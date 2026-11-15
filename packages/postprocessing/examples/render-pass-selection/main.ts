// RenderPass selection: only the objects in a Selection are drawn
import * as THREE from 'three';
import { EffectComposer, RenderPass, Selection } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // Lights have layers too: a light outside the selection would leave the selected meshes unlit.
  const selection = new Selection();
  for (const object of subject.group.children) {
    const isFloor = object instanceof THREE.Mesh && object.geometry instanceof THREE.PlaneGeometry;
    if (!isFloor) selection.add(object);
  }

  const composer = stage.own(new EffectComposer(stage.renderer));
  const renderPass = new RenderPass(stage.scene, stage.camera);
  composer.addPass(renderPass);

  const label = overlay(stage.box);
  const set = (on: boolean): void => {
    // The selection restricts what the pass renders; null renders everything again.
    renderPass.selection = on ? selection : (null as never); // the typings reject null
    label.textContent = on ? `selection: ${selection.size} objects, the floor is left out` : 'selection = null: everything is drawn';
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'use selection', false, set);
  else {
    let on = false;
    stage.every(2200, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
