// Entity clone(): a deep copy with components, tags and children, outside the scene until added
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 11, pitch: -35, autoRotate: 8 }, floor: 16, sun: { shadows: true } });
  const { app } = scene;

  // The original: a tagged entity with a render component and a child.
  const original = new pc.Entity('totem');
  original.tags.add('prop', 'cloned-from');
  original.addComponent('render', { type: 'cylinder', material: material('#4ab3e8'), castShadows: true });
  original.setLocalScale(0.8, 1.6, 0.8);
  original.setLocalPosition(-4, 0.8, 0);
  app.root.addChild(original);
  const top = addShape(original, 'sphere', material('#f2c14e'), [0, 0.8, 0], 0.9, 'top');
  top.setLocalScale(1, 0.5, 1);

  const copies: pc.Entity[] = [];
  const spawn = (): void => {
    const copy = original.clone() as pc.Entity; // name, tags, transform, components and children
    copy.name = `totem-copy-${copies.length + 1}`;
    copy.tags.remove('cloned-from');
    copy.tags.add('copy');
    // Not in the scene yet: place it, then add it.
    copy.setPosition(-4 + (copies.length + 1) * 1.6, 0.8 + (copies.length % 3) * 0.4, ((copies.length * 2) % 5) - 2);
    app.root.addChild(copy);
    copies.push(copy);
  };

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    original.rotate(0, 50 * dt, 0);
    copies.forEach((c, i) => c.rotate(0, (30 + i * 10) * dt, 0));
    if (ctx.preview && Math.floor(t / 0.8) > copies.length - 0 && copies.length < 6) spawn();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout();
    panel.button('clone()', spawn);
    panel.button('tint the original', () => (original.render!.material = material('#e8794a')));
    panel.button('clear copies', () => {
      copies.splice(0).forEach((c) => c.destroy());
    });
    app.on('update', () => {
      const last = copies.at(-1);
      info.textContent = `copies: ${copies.length}` + (last ? `   last copy: tags [${last.tags.list().join(', ')}], children ${last.children.length}, has render ${!!last.render}` : '');
    });
    panel.row();
    panel.readout('A copy keeps a snapshot of the original, children included. Tinting the original later does not touch copies already made.');
  }

  return () => scene.dispose();
};

export default mount;
