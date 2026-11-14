// One script class configured per entity through attributes, then tweaked
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { tint } from '../../shared/scripting.ts';

// In the Editor each `@attribute` member becomes an Inspector control. In code they
// are plain members, set through `properties` or on the instance later.
class Satellite extends pc.Script {
  static override scriptName = 'satellite';

  /** @attribute */
  speed = 40;
  /** @attribute */
  axis = new pc.Vec3(0, 1, 0);
  /** @attribute */
  colour = new pc.Color(1, 1, 1);
  /**
   * @attribute
   * @type {Entity}
   */
  target: pc.Entity | null = null;
  /** @attribute */
  wobble = { amp: 0.3, freq: 2 };

  private angle = 0;
  private t = 0;

  initialize(): void {
    tint(this.entity, this.colour);
  }
  update(dt: number): void {
    this.t += dt;
    this.angle += this.speed * dt;
    this.entity.rotate(this.axis.x * 90 * dt, this.axis.y * 90 * dt, this.axis.z * 90 * dt);
    if (!this.target) return;
    const c = this.target.getPosition();
    const r = this.entity.name === 'far' ? 4.2 : 2.6;
    const a = this.angle * pc.math.DEG_TO_RAD;
    this.entity.setPosition(c.x + Math.cos(a) * r, 1 + Math.sin(this.t * this.wobble.freq) * this.wobble.amp, c.z + Math.sin(a) * r);
  }
}

const CONFIGS = [
  { name: 'near', speed: 60, axis: new pc.Vec3(0, 1, 0), colour: '#e8794a', wobble: { amp: 0.1, freq: 2 } },
  { name: 'far', speed: 25, axis: new pc.Vec3(1, 0, 1), colour: '#4ab3e8', wobble: { amp: 0.6, freq: 1 } },
  { name: 'near', speed: -90, axis: new pc.Vec3(0, 0, 1), colour: '#7bc67b', wobble: { amp: 0.4, freq: 4 } },
];

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 11, pitch: -35 } });
  const { app } = scene;

  const hub = addShape(app.root, 'sphere', material('#f2c14e', { emissive: '#7a5a10' }), [0, 1, 0], 1.4, 'hub');

  const satellites = CONFIGS.map((cfg) => {
    const e = addShape(app.root, 'box', material('#ffffff'), [0, 1, 0], 0.8, cfg.name);
    e.addComponent('script');
    return e.script!.create(Satellite, {
      properties: { speed: cfg.speed, axis: cfg.axis, colour: new pc.Color().fromString(cfg.colour), target: hub, wobble: cfg.wobble },
    })!;
  });
  // Spread the starting angles by running the instances ahead.
  satellites.forEach((s, i) => s.update(i * 2));

  if (!ctx.preview) {
    const panel = createPanel(el);
    let current = satellites[0]!;
    panel.select('instance', ['0', '1', '2'] as const, '0', (v) => (current = satellites[Number(v)]!));
    panel.row();
    panel.slider('speed', -120, 120, 1, current.speed, (v) => (current.speed = v));
    panel.slider('wobble.amp', 0, 1, 0.05, current.wobble.amp, (v) => (current.wobble = { ...current.wobble, amp: v }));
    panel.slider('wobble.freq', 0, 6, 0.1, current.wobble.freq, (v) => (current.wobble = { ...current.wobble, freq: v }));
    panel.row();
    panel.button('random colour', () => {
      current.colour = new pc.Color(Math.random(), Math.random(), Math.random());
      tint(current.entity, current.colour);
    });
  }
  return () => scene.dispose();
};

export default mount;
