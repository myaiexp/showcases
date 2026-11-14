// A static batch group merges 240 props into few draw calls
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene, rng } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 240;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 30, pitch: -38, sun: { angles: [50, 30, 0], shadows: false } });
  const { app } = scene;
  const batcher = app.batcher;

  // Batching needs one shared material (and the same layer and shader parameters).
  const material = colorMaterial('#d9a066', { gloss: 0.3 });
  const rand = rng(3);
  const props = Array.from({ length: COUNT }, (_, i) => {
    const e = new pc.Entity(`prop ${i}`);
    e.addComponent('render', { type: i % 2 ? 'cylinder' : 'box', material, castShadows: false });
    const base = new pc.Vec3((rand() - 0.5) * 36, 0.5 + rand() * 0.6, (rand() - 0.5) * 36);
    e.setLocalPosition(base);
    e.setLocalScale(0.9, 1 + rand() * 1.2, 0.9);
    app.root.addChild(e);
    return { e, base };
  });

  // name, dynamic, maxAabbSize: a static group cannot move its members afterwards.
  const group = batcher.addGroup('Props', false, 40);
  const setBatched = (on: boolean): void => {
    for (const p of props) p.e.render!.batchGroupId = on ? group.id : -1; // joining or leaving marks the group dirty
  };
  setBatched(true);

  let readout: HTMLElement | null = null;
  let nudge = 0;
  if (!ctx.preview) {
    const panel = createPanel(el);
    readout = panel.readout();
    panel.row();
    panel.check('batched', true, setBatched);
    panel.slider('maxAabbSize', 4, 60, 2, 40, (v) => {
      group.maxAabbSize = v; // smaller boxes: more batches, better culling
      batcher.markGroupDirty(group.id);
    });
    panel.row();
    panel.button('Move the props', () => {
      nudge = (nudge + 1) % 2;
      // The batch holds a copy of the geometry: moving the entities alone changes nothing on screen.
      for (const p of props) p.e.setLocalPosition(p.base.x * (1 + nudge * 0.4), p.base.y, p.base.z * (1 + nudge * 0.4));
    });
    panel.button('markGroupDirty', () => batcher.markGroupDirty(group.id));
  }
  app.on('update', () => {
    if (readout) readout.textContent = `${app.stats.drawCallCount} draw calls`;
  });

  return () => {
    // removeGroup clears the entities' batchGroupId; the app destroys the entities.
    batcher.removeGroup(group.id);
    material.destroy();
    scene.dispose();
  };
};

export default mount;
