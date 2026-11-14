// initialize waits for a clone or disabled script to be in the scene
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

class Pop extends pc.Script {
  static override scriptName = 'pop';
  initialize(): void {
    this.app.fire('log', `${this.entity.name}: initialize (pops to double size)`);
    this.entity.setLocalScale(2, 2, 2);
  }
  update(dt: number): void {
    const s = this.entity.getLocalScale().x;
    const next = pc.math.lerp(s, 1, 1 - Math.exp(-4 * dt));
    this.entity.setLocalScale(next, next, next);
    this.entity.rotate(0, 50 * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 9, pitch: -28 } });
  const { app } = scene;
  const out = createLog(el, ctx, 8);
  // Clones copy attribute data, not `properties`, and look the class up by name.
  app.scripts.add(Pop);
  app.on('log', out.log);

  const original = addBox(app.root, 'original', '#4ab3e8', [0, 1, 0]);
  original.addComponent('script');
  original.script!.create(Pop);

  let serial = 0;
  let slot = 0;
  const place = (e: pc.Entity): void => {
    slot++;
    e.setLocalPosition(-4 + (slot % 5) * 2, 1, 2.2 * (slot % 2 ? 1 : -1.2));
  };

  // entity.clone() copies the script component, but initialize waits for the scene.
  const clone = (): pc.Entity => {
    const copy = original.clone() as pc.Entity;
    copy.name = `clone ${++serial}`;
    place(copy);
    out.log(`${copy.name}: cloned, initialize not called yet`);
    return copy;
  };

  // A script created with enabled: false initializes the first time it is enabled.
  const sleeper = (): pc.Entity => {
    const box = addBox(new pc.Entity(), `sleeper ${++serial}`, '#f2c14e', [0, 1, 0]);
    box.addComponent('script');
    box.script!.create(Pop, { enabled: false });
    place(box);
    app.root.addChild(box);
    out.log(`${box.name}: in the scene, script created disabled`);
    return box;
  };

  if (ctx.preview) {
    let t = 0;
    let n = 0;
    const spawned: pc.Entity[] = [];
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.4) return;
      t = 0;
      const copy = clone();
      app.root.addChild(copy);
      spawned.push(copy);
      if (++n % 4 === 0) while (spawned.length) spawned.pop()!.destroy();
    });
  } else {
    const panel = createPanel(el);
    let pending: pc.Entity | null = null;
    let waiting: pc.Entity | null = null;
    panel.button('clone original', () => {
      pending = clone();
    });
    panel.button('add the clone to app.root', () => {
      if (pending) app.root.addChild(pending);
      pending = null;
    });
    panel.row();
    panel.button('add entity with disabled script', () => {
      waiting = sleeper();
    });
    panel.button('enable that script', () => {
      const instance = waiting?.script?.get(Pop);
      if (instance) instance.enabled = true;
      waiting = null;
    });
  }
  return () => scene.dispose();
};

export default mount;
