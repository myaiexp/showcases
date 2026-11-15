// Selection.setVisible: hide the selected objects from the main render without dropping them
import { CopyPass, EffectComposer, RenderPass, Selection } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, readout } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { maskListing, pickObjects, tintMaterial } from '../../shared/selection-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);
  const picks = pickObjects(subject.group);

  const selection = new Selection(picks.slice(0, 4).map((p) => p.mesh), 5);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const tint = tintMaterial();
  const selected = new RenderPass(stage.scene, stage.camera, tint);
  selected.selection = selection;
  selected.clear = false;
  selected.ignoreBackground = true;
  composer.addPass(selected);
  composer.addPass(new CopyPass());
  stage.onDispose(() => tint.dispose());

  const label = overlay(stage.box);
  const list = stage.bar ? readout(stage.box) : null;
  if (list) list.style.padding = '8px 4px';
  const apply = (visible: boolean): void => {
    // Turns layer 0 on or off for every member; the selection layer stays on.
    selection.setVisible(visible);
    label.textContent = `selection.setVisible(${visible})\nlayer 0 ${visible ? 'on' : 'off'} for ${selection.size} objects`;
    if (list) list.textContent = maskListing(picks, selection);
  };
  apply(true);
  if (stage.bar) checkbox(stage.bar, 'visible', true, apply);
  else {
    let on = true;
    stage.every(2200, () => apply((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
