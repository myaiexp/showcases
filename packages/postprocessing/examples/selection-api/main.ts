// Selection as a Set: add, delete, toggle, set and clear move objects in and out of one render layer
import { CopyPass, EffectComposer, RenderPass, Selection } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, readout, select } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { maskListing, pickObjects, tintMaterial } from '../../shared/selection-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);
  const picks = pickObjects(subject.group);
  const meshes = picks.map((p) => p.mesh);

  // An explicit layer: the default comes from a counter shared by the whole page.
  const selection = new Selection(undefined, 5);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // A RenderPass with a selection draws only that layer; the tint material overrides every material.
  const tint = tintMaterial();
  const selected = new RenderPass(stage.scene, stage.camera, tint);
  selected.selection = selection;
  selected.clear = false;
  selected.ignoreBackground = true;
  composer.addPass(selected);
  composer.addPass(new CopyPass());
  stage.onDispose(() => tint.dispose());

  const call = overlay(stage.box);
  const list = stage.bar ? readout(stage.box) : null;
  if (list) list.style.padding = '8px 4px';
  let next = 0;
  const run = (text: string, action: () => void): void => {
    action();
    call.textContent = `${text}\nselection.size = ${selection.size}`;
    if (list) list.textContent = `selection.layer = ${selection.layer}\n${maskListing(picks, selection)}`;
  };
  const ops: [string, () => void][] = [
    ['selection.add(knot)', () => selection.add(meshes[0]!)],
    ['selection.add(ball A)', () => selection.add(meshes[1]!)],
    ['selection.toggle(crate A)', () => selection.toggle(meshes[4]!)],
    ['selection.delete(knot)', () => selection.delete(meshes[0]!)],
    ['selection.set([ball B, ball C])', () => selection.set([meshes[2]!, meshes[3]!])],
    ['selection.clear()', () => selection.clear()],
  ];

  if (stage.bar) {
    const bar = stage.bar;
    button(bar, 'add next', () => run('selection.add(next)', () => selection.add(meshes[next++ % meshes.length]!)));
    button(bar, 'toggle next', () => run('selection.toggle(next)', () => selection.toggle(meshes[next++ % meshes.length]!)));
    button(bar, 'delete last', () => run('selection.delete(last)', () => selection.delete([...selection].at(-1)!)));
    button(bar, 'set first three', () => run('selection.set(first three)', () => selection.set(meshes.slice(0, 3))));
    button(bar, 'clear', () => run('selection.clear()', () => selection.clear()));
    // The layer setter moves every selected object to the new layer.
    select(bar, 'layer', ['5', '6', '7'], (v) => run(`selection.layer = ${v}`, () => (selection.layer = Number(v))), '5');
    run('click a button', () => selection.set(meshes.slice(0, 2)));
  } else {
    let i = 0;
    const [text, action] = ops[0]!;
    run(text, action);
    stage.every(1400, () => {
      const [t, a] = ops[++i % ops.length]!;
      run(t, a);
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
