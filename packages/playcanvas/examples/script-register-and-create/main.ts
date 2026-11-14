// Registering ESM script classes with app.scripts, attached by class or name
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox } from '../../shared/scripting.ts';

class Rotator extends pc.Script {
  static override scriptName = 'rotator';
  speed = 60;
  update(dt: number): void {
    this.entity.rotate(0, this.speed * dt, 0);
  }
}

class Bobber extends pc.Script {
  static override scriptName = 'bobber';
  private t = 0;
  update(dt: number): void {
    this.t += dt;
    const p = this.entity.getLocalPosition();
    this.entity.setLocalPosition(p.x, 1.2 + Math.sin(this.t * 3) * 0.5, p.z);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 9, pitch: -25 } });
  const { app } = scene;

  // Engine-only apps register a class before it can be attached by its name.
  app.scripts.add(Rotator);

  const byName = addBox(app.root, 'by name', '#4ab3e8', [-3, 1, 0]);
  byName.addComponent('script');
  byName.script!.create('rotator');

  const byClass = addBox(app.root, 'by class', '#f2c14e', [-1, 1, 0]);
  byClass.addComponent('script');
  // `properties` are assigned onto the instance before initialize runs.
  byClass.script!.create(Rotator, { properties: { speed: -150 } });

  // 'bobber' is not registered yet: create() by name cannot find the class, so it waits.
  const waiting = addBox(app.root, 'waiting', '#7bc67b', [1.5, 1.2, 0]);
  waiting.addComponent('script');
  const first = waiting.script!.create('bobber');

  let status = (): void => {};
  const registerBobber = (): void => {
    if (!app.scripts.has('bobber')) app.scripts.add(Bobber);
    status();
  };

  if (ctx.preview) {
    let t = 0;
    const timer = (dt: number): void => {
      t += dt;
      if (t > 2.5) {
        app.off('update', timer);
        registerBobber();
      }
    };
    app.on('update', timer);
  } else {
    const panel = createPanel(el);
    const out = panel.readout();
    status = () => {
      const names = app.scripts.list().map((s) => s.scriptName);
      out.textContent = `create('bobber') returned ${first === null ? 'null' : 'an instance'} | registered: [${names.join(', ')}] | green box has bobber: ${waiting.script!.has('bobber')}`;
    };
    panel.row();
    panel.button('scripts.add(Bobber)', registerBobber);
    panel.button("scripts.remove('bobber')", () => {
      app.scripts.remove('bobber');
      status();
    });
    panel.button('destroy rotator scripts', () => {
      byName.script!.destroy('rotator');
      byClass.script!.destroy(Rotator);
      status();
    });
    status();
  }

  return () => scene.dispose();
};

export default mount;
