// Creating and destroying entities: addChild, the destroy event, removeChild versus destroy
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 11, pitch: -35, autoRotate: 8 }, floor: 14 });
  const { app } = scene;

  const palette = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'].map((c) => material(c));
  const group = new pc.Entity('group');
  app.root.addChild(group);
  let count = 0;
  const log: string[] = [];
  let showLog = (): void => {};

  // A new entity joins the scene only when it is added to a parent that is in the scene.
  const spawn = (): pc.Entity => {
    const n = ++count;
    const e = new pc.Entity(`cube-${n}`);
    e.addComponent('render', { type: 'box', material: palette[n % palette.length] });
    e.setLocalPosition(((n * 7) % 9) - 4, 0.5 + (n % 3) * 0.1, ((n * 5) % 7) - 3);
    e.once('destroy', () => {
      log.unshift(`${e.name} destroyed`);
      showLog();
    });
    group.addChild(e);
    return e;
  };
  for (let i = 0; i < 5; i++) spawn();
  const detached: pc.Entity[] = [];

  if (ctx.preview) {
    // Cards spawn a cube every half second and destroy the oldest beyond eight.
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 0.5) {
        t = 0;
        spawn();
        if (group.children.length > 8) group.children[0]!.destroy();
      }
    });
  } else {
    const panel = createPanel(el);
    const state = panel.readout();
    panel.row();
    const events = panel.readout();
    showLog = () => (events.textContent = log.slice(0, 3).join('   '));
    app.on('update', () => (state.textContent = `children in scene: ${group.children.length}   detached by removeChild: ${detached.length}`));
    panel.button('new Entity + addChild', () => void spawn());
    panel.button('destroy() the newest', () => group.children.at(-1)?.destroy());
    panel.button('removeChild() the newest', () => {
      const last = group.children.at(-1);
      if (!last) return;
      group.removeChild(last);
      detached.push(last as pc.Entity);
    });
    panel.button('addChild() a detached one back', () => {
      const e = detached.pop();
      if (e) group.addChild(e);
    });
    panel.row();
    panel.readout('A removed entity is out of the scene but alive: it can come back. A destroyed one cannot.');
  }
  addShape(app.root, 'sphere', material('#000000', { emissive: '#ffd89a' }), [0, 3, 0], 0.3).render!.castShadows = false;

  return () => {
    // Detached entities are no longer under app.root, so the app will not destroy them.
    detached.forEach((e) => e.destroy());
    scene.dispose();
  };
};

export default mount;
