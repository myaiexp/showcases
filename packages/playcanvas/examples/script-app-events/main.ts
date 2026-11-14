// Application events as a hub: namespaced names, once, off and a scope argument
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog } from '../../shared/scripting.ts';

const COLOURS = ['#e8794a', '#4ab3e8', '#7bc67b'];

// Fires app events and holds no reference to whoever listens.
class Emitter extends pc.Script {
  static override scriptName = 'emitter';
  private running = false;
  private t = 0;
  private onStart = (): void => {
    this.running = true;
    this.app.fire('log', 'game:start received by the emitter');
  };

  initialize(): void {
    this.app.once('game:start', this.onStart);
    this.once('destroy', () => this.app.off('game:start', this.onStart));
  }
  update(dt: number): void {
    this.t += dt;
    if (!this.running || this.t < 0.45) return;
    this.t = 0;
    const a = Math.random() * Math.PI * 2;
    this.app.fire('orb:spawn', Math.floor(Math.random() * 3), new pc.Vec3(Math.cos(a) * 4, 4, Math.sin(a) * 4));
  }
}

// Listens with the `scope` argument of on() so `this` stays the script.
class Collector extends pc.Script {
  static override scriptName = 'collector';
  materials: pc.Material[] = [];
  private orbs: pc.Entity[] = [];

  initialize(): void {
    this.app.on('orb:spawn', this.onSpawn, this);
    this.once('destroy', () => this.app.off('orb:spawn', this.onSpawn, this));
  }
  onSpawn(colour: number, at: pc.Vec3): void {
    const orb = addShape(this.app.root, 'sphere', this.materials[colour]!, [at.x, at.y, at.z], 0.5, 'orb');
    this.orbs.push(orb);
  }
  update(dt: number): void {
    this.orbs = this.orbs.filter((orb) => {
      const p = orb.getPosition();
      orb.setPosition(p.x, p.y - 4 * dt, p.z);
      if (p.y > 0.3) return true;
      orb.destroy();
      return false;
    });
  }
}

// Only subscribes while enabled: on('enable') adds the listener and on('disable') removes it.
class Tally extends pc.Script {
  static override scriptName = 'tally';
  columns: pc.Entity[] = [];
  private counts = [0, 0, 0];
  private onSpawn = (colour: number): void => {
    this.counts[colour]!++;
    const h = 0.2 + (this.counts[colour]! % 16) * 0.2;
    this.columns[colour]!.setLocalScale(0.8, h, 0.8);
    this.columns[colour]!.setLocalPosition((colour - 1) * 1.2, h / 2, 0);
  };

  initialize(): void {
    const sub = (): void => {
      this.app.on('orb:spawn', this.onSpawn);
    };
    this.on('enable', sub);
    this.on('disable', () => this.app.off('orb:spawn', this.onSpawn));
    if (this.enabled) sub();
    this.once('destroy', () => this.app.off('orb:spawn', this.onSpawn));
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 11, pitch: -32 } });
  const { app } = scene;
  const out = createLog(el, ctx, 4);
  app.on('log', out.log);

  const tower = addBox(app.root, 'emitter', '#f2c14e', [0, 2, 0], 1);
  tower.setLocalScale(0.6, 4, 0.6);
  tower.addComponent('script');
  tower.script!.create(Emitter);

  const materials = COLOURS.map((c) => material(c));
  tower.script!.create(Collector, { properties: { materials } });

  const board = new pc.Entity('tally board');
  board.setLocalPosition(0, 0, -6);
  app.root.addChild(board);
  const columns = COLOURS.map((c, i) => addShape(board, 'box', materials[i]!, [(i - 1) * 1.2, 0.1, 0], [0.8, 0.2, 0.8], `column ${i}`));
  board.addComponent('script');
  const tally = board.script!.create(Tally, { properties: { columns } })!;

  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      const before = t;
      t += dt;
      if (before < 0.4 && t >= 0.4) app.fire('game:start');
    });
  } else {
    const panel = createPanel(el);
    const readout = panel.readout();
    panel.row();
    panel.button("app.fire('game:start')", () => app.fire('game:start'));
    panel.check('tally script enabled', true, (on) => (tally.enabled = on));
    app.on('update', () => {
      readout.textContent = `app.hasEvent('orb:spawn') = ${app.hasEvent('orb:spawn')}, game:start pending = ${app.hasEvent('game:start')}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
