// Script component events: create, destroy, move, enable, disable and remove
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

class Spin extends pc.Script {
  static override scriptName = 'spin';
  update(dt: number): void {
    this.entity.rotate(0, 120 * dt, 0);
  }
}
class Bob extends pc.Script {
  static override scriptName = 'bob';
  private t = 0;
  update(dt: number): void {
    this.t += dt;
    const p = this.entity.getLocalPosition();
    this.entity.setLocalPosition(p.x, 1.4 + Math.sin(this.t * 4) * 0.6, p.z);
  }
}
class Pulse extends pc.Script {
  static override scriptName = 'pulse';
  private t = 0;
  update(dt: number): void {
    this.t += dt;
    const s = 1.2 + Math.sin(this.t * 6) * 0.35;
    this.entity.setLocalScale(s, s, s);
  }
}

const BEHAVIOURS = { spin: Spin, bob: Bob, pulse: Pulse };
type Name = keyof typeof BEHAVIOURS;

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 10, orbit: { distance: 7, pitch: -22 } });
  const { app } = scene;
  const out = createLog(el, ctx, 8);
  for (const cls of Object.values(BEHAVIOURS)) app.scripts.add(cls);

  const box = addBox(app.root, 'subject', '#a78bfa', [0, 1.4, 0], 1.2);
  box.addComponent('script');
  const sc = (): pc.ScriptComponent => box.script!;

  // The component reports each change to its list of scripts.
  const listen = (c: pc.ScriptComponent): void => {
    c.on('create', (name: string) => out.log(`create '${name}'`));
    c.on('destroy', (name: string) => out.log(`destroy '${name}'`));
    c.on('move', (name: string, _s: pc.Script, to: number, from: number) => out.log(`move '${name}' ${from} -> ${to}`));
    c.on('state', (enabled: boolean) => out.log(`component state -> ${enabled}`));
    c.on('remove', () => out.log('remove: the script component is gone'));
    // The :name forms listen for one script only.
    c.on('create:spin', () => out.log("  (create:spin) spin-specific handler ran"));
  };
  listen(sc());

  const toggle = (name: Name): void => {
    if (!box.script) return;
    if (sc().has(name)) sc().destroy(name);
    else sc().create(name);
  };

  if (ctx.preview) {
    let t = 0;
    let i = 0;
    const names = Object.keys(BEHAVIOURS) as Name[];
    app.on('update', (dt: number) => {
      t += dt;
      if (t < 1.1) return;
      t = 0;
      toggle(names[i++ % names.length]!);
    });
  } else {
    const panel = createPanel(el);
    for (const name of Object.keys(BEHAVIOURS) as Name[]) panel.button(`toggle ${name}`, () => toggle(name));
    panel.row();
    panel.button('move spin to the end', () => box.script?.has('spin') && sc().move('spin', sc().scripts.length - 1));
    panel.button('script.enabled = !enabled', () => box.script && (sc().enabled = !sc().enabled));
    panel.button('removeComponent("script")', () => {
      if (box.script) box.removeComponent('script');
    });
    panel.button('addComponent("script")', () => {
      if (!box.script) {
        box.addComponent('script');
        listen(sc());
      }
    });
  }
  return () => scene.dispose();
};

export default mount;
