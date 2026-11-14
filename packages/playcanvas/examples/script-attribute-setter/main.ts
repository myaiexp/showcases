// Reacting to attribute changes: a setter, and a watch helper that fires events
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

// A setter runs whenever the value is assigned, from the Editor or from code.
class Lamp extends pc.Script {
  static override scriptName = 'lamp';
  private _brightness = 1;

  /** @attribute */
  get brightness(): number {
    return this._brightness;
  }
  set brightness(value: number) {
    this._brightness = value;
    // Update the light intensity whenever brightness changes.
    if (this.entity.light) this.entity.light.intensity = value * 2.5;
    const mat = this.entity.render?.meshInstances[0]?.material as pc.StandardMaterial | undefined;
    if (mat) {
      mat.emissive = new pc.Color(value, value * 0.85, value * 0.4);
      mat.update();
    }
  }
}

// ESM scripts fire no attr:speed events, so wrap the member and fire your own.
function watch(target: pc.Script, prop: 'speed'): void {
  const t = target as unknown as Record<string, number>;
  let value = t[prop]!;
  Object.defineProperty(target, prop, {
    get: () => value,
    set(next: number) {
      if (next === value) return;
      const old = value;
      value = next;
      target.fire(`changed:${prop}`, next, old);
    },
  });
}

class Spinner extends pc.Script {
  static override scriptName = 'spinner';
  /** @attribute */
  speed = 60;

  initialize(): void {
    watch(this, 'speed');
  }
  update(dt: number): void {
    this.entity.rotate(0, this.speed * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, sun: { intensity: 0.3 }, orbit: { distance: 8, pitch: -25 } });
  const { app } = scene;
  const out = createLog(el, ctx, 5);

  const lamp = addShape(app.root, 'sphere', material('#222222'), [-2.2, 1.6, 0], 0.8, 'lamp');
  lamp.addComponent('light', { type: 'omni', range: 8, color: new pc.Color(1, 0.85, 0.5) });
  lamp.addComponent('script');
  const lampScript = lamp.script!.create(Lamp, { properties: { brightness: 1 } })!;

  const box = addBox(app.root, 'spinner', '#4ab3e8', [2.2, 1, 0], 1.5);
  box.addComponent('script');
  const spinner = box.script!.create(Spinner)!;
  spinner.on('changed:speed', (next: number, old: number) => out.log(`changed:speed ${old} -> ${next}`));

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      lampScript.brightness = 0.55 + Math.sin(t * 1.6) * 0.45;
      spinner.speed = 60 + Math.sin(t * 0.8) * 50;
    });
  } else {
    const panel = createPanel(el);
    panel.slider('lamp.brightness', 0, 2, 0.05, 1, (v) => (lampScript.brightness = v));
    panel.slider('spinner.speed', -200, 200, 5, 60, (v) => (spinner.speed = v));
  }
  return () => scene.dispose();
};

export default mount;
