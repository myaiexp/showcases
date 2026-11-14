// ESM attributes are passed by reference; a setter can copy the value instead
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox } from '../../shared/scripting.ts';

// Gets the very Vec3 it was given, so it sees every later change to it.
class ByReference extends pc.Script {
  static override scriptName = 'byReference';
  /** @attribute */
  goal = new pc.Vec3();

  update(dt: number): void {
    follow(this.entity, this.goal, dt);
  }
}

// Copies the value in, so the caller's Vec3 can change without affecting it.
class ByCopy extends pc.Script {
  static override scriptName = 'byCopy';
  private _goal = new pc.Vec3();

  /** @attribute */
  set goal(value: pc.Vec3) {
    this._goal.copy(value);
  }
  get goal(): pc.Vec3 {
    return this._goal;
  }
  update(dt: number): void {
    follow(this.entity, this._goal, dt);
  }
}

function follow(entity: pc.Entity, goal: pc.Vec3, dt: number): void {
  const p = entity.getPosition();
  const k = 1 - Math.exp(-5 * dt);
  entity.setPosition(pc.math.lerp(p.x, goal.x, k), 1, pc.math.lerp(p.z, goal.z, k));
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 10, pitch: -50 } });
  const { app } = scene;

  const goal = new pc.Vec3(3, 1, 0);
  const marker = addShape(app.root, 'sphere', material('#f2c14e', { emissive: '#7a5a10' }), [3, 1, 0], 0.5, 'goal');

  const ref = addBox(app.root, 'by reference', '#4ab3e8', [-3, 1, -2]);
  ref.addComponent('script');
  ref.script!.create(ByReference, { properties: { goal } });

  const copy = addBox(app.root, 'by copy', '#e8794a', [-3, 1, 2]);
  copy.addComponent('script');
  const copying = copy.script!.create(ByCopy, { properties: { goal } })!;

  let t = 0;
  let moving = true;
  app.on('update', (dt: number) => {
    if (moving) t += dt;
    // The same Vec3 object is mutated in place every frame.
    goal.set(Math.cos(t * 0.9) * 3.5, 1, Math.sin(t * 0.9) * 3.5);
    marker.setPosition(goal);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Assign the goal to the copying script again', () => (copying.goal = goal));
    panel.check('goal moves', true, (on) => (moving = on));
    panel.readout('blue follows the shared Vec3; orange kept the copy it was given');
  } else {
    // In a card the copy is refreshed now and then so the orange box also travels.
    let u = 0;
    app.on('update', (dt: number) => {
      u += dt;
      if (u > 2.5) {
        u = 0;
        copying.goal = goal;
      }
    });
  }
  return () => scene.dispose();
};

export default mount;
