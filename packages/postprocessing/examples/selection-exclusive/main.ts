// Selection.exclusive: added objects leave every other layer, so the main pass stops drawing them
import { CopyPass, EffectComposer, RenderPass, Selection } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox, overlay, readout } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { maskListing, pickObjects, tintMaterial } from '../../shared/selection-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);
  const picks = pickObjects(subject.group);
  const chosen = [picks[0]!, picks[1]!, picks[2]!, picks[3]!].map((p) => p.mesh);

  const selection = new Selection(undefined, 5);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const tint = tintMaterial();
  tint.opacity = 0.9;
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
  // exclusive only affects add(): set() clears, then adds again under the current flag.
  const apply = (exclusive: boolean): void => {
    selection.exclusive = exclusive;
    selection.set(chosen);
    label.textContent = `selection.exclusive = ${exclusive}\n${exclusive ? 'the main pass no longer draws them' : 'drawn by both passes'}`;
    if (list) list.textContent = maskListing(picks, selection);
  };
  apply(false);
  if (stage.bar) {
    let on = false;
    checkbox(stage.bar, 'exclusive', false, (v) => {
      on = v;
      apply(on);
    });
    button(stage.bar, 'selection.set() again', () => apply(on));
  } else {
    let on = false;
    stage.every(2400, () => apply((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
