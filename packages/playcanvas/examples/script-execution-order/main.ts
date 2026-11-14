// Scripts on one entity run top to bottom; script.move changes the order
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

const setX = (e: pc.Entity, x: number): void => {
  const p = e.getLocalPosition();
  e.setLocalPosition(x, p.y, p.z);
};

class Reset extends pc.Script {
  static override scriptName = 'reset';
  update(): void {
    setX(this.entity, 0);
  }
}
class Shift extends pc.Script {
  static override scriptName = 'shift';
  update(): void {
    setX(this.entity, this.entity.getLocalPosition().x + 2);
  }
}
class Double extends pc.Script {
  static override scriptName = 'double';
  update(): void {
    setX(this.entity, this.entity.getLocalPosition().x * 2);
  }
}

const ORDERS: Record<string, string[]> = {
  'reset, shift, double': ['reset', 'shift', 'double'],
  'reset, double, shift': ['reset', 'double', 'shift'],
  'shift, double, reset': ['shift', 'double', 'reset'],
};

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 16, orbit: { distance: 11, pitch: -45, yaw: 0, autoRotate: 0 } });
  const { app } = scene;
  const out = createLog(el, ctx, 5);

  for (const x of [0, 2, 4]) addBox(app.root, `mark ${x}`, '#3a4152', [x, 0.05, 0], 1).setLocalScale(1.6, 0.1, 1.6);
  const box = addBox(app.root, 'subject', '#f2c14e', [0, 1, 0]);
  box.addComponent('script');
  app.scripts.add(Reset);
  app.scripts.add(Shift);
  app.scripts.add(Double);
  // `ind` places a script at an index; new scripts are otherwise appended.
  box.script!.create(Reset);
  box.script!.create(Shift);
  box.script!.create(Double);
  box.script!.on('move', (name: string, _inst: pc.Script, to: number, from: number) => out.log(`move('${name}'): index ${from} -> ${to}`));

  const apply = (names: string[]): void => {
    names.forEach((name, i) => box.script!.move(name, i));
    out.log(`order: ${box.script!.scripts.map((s) => (s.constructor as typeof pc.Script).scriptName).join(', ')}`);
  };

  const keys = Object.keys(ORDERS);
  if (ctx.preview) {
    let t = 0;
    let i = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 2) {
        t = 0;
        apply(ORDERS[keys[++i % keys.length]!]!);
      }
    });
  } else {
    const panel = createPanel(el);
    panel.select('order', keys as readonly string[], keys[0]!, (v) => apply(ORDERS[v]!));
    panel.readout('The box ends each frame at x = 4, 2 or 0 depending on which script runs last.');
  }
  return () => scene.dispose();
};

export default mount;
