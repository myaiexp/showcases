// A script's enable, disable, state and destroy events and what triggers each
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog, tint } from '../../shared/scripting.ts';

const ON = '#7bc67b';
const OFF = '#6b7080';

class Watcher extends pc.Script {
  static override scriptName = 'watcher';
  say: (text: string) => void = () => {};

  initialize(): void {
    this.on('enable', () => this.say('enable'));
    this.on('disable', () => this.say('disable'));
    this.on('state', (enabled: boolean) => {
      this.say(`state -> ${enabled}`);
      tint(this.entity, enabled ? ON : OFF);
    });
    this.once('destroy', () => this.say('destroy'));
    // A script that starts enabled fires enable during initialisation, before these
    // handlers exist, so apply the starting state by hand.
    tint(this.entity, this.enabled ? ON : OFF);
  }
  update(dt: number): void {
    this.entity.rotate(0, 60 * dt, 0);
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 10, orbit: { distance: 7, pitch: -25 } });
  const { app } = scene;
  const out = createLog(el, ctx, 8);

  const parent = new pc.Entity('parent');
  app.root.addChild(parent);
  const child = addBox(parent, 'child', ON, [0, 1, 0], 1.6);
  child.addComponent('script');
  const create = (): Watcher | null => child.script!.create(Watcher, { properties: { say: out.log } });
  let watcher = create();

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      const before = Math.floor(t / 1.2);
      t += dt;
      if (Math.floor(t / 1.2) !== before && watcher) watcher.enabled = !watcher.enabled;
    });
  } else {
    const panel = createPanel(el);
    const flip = (label: string, toggle: () => void): void => {
      panel.button(label, () => {
        out.log(`> ${label}`);
        toggle();
      });
    };
    flip('script.enabled', () => watcher && (watcher.enabled = !watcher.enabled));
    flip('script component enabled', () => (child.script!.enabled = !child.script!.enabled));
    flip('entity.enabled', () => (child.enabled = !child.enabled));
    flip('parent.enabled', () => (parent.enabled = !parent.enabled));
    panel.row();
    flip('destroy script', () => {
      child.script!.destroy(Watcher);
      watcher = null;
    });
    flip('create script', () => {
      watcher ??= create();
    });
  }
  return () => scene.dispose();
};

export default mount;
