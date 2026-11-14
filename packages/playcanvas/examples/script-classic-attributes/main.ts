// A classic script built with createScript and attributes.add, with attr events
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBox, createLog, tint } from '../../shared/scripting.ts';

// Attributes are defined as properties at run time, so the type checker sees `any`.
const paint = (script: any): void => tint(script.entity, new pc.Color(script.tint.r, script.tint.g, script.tint.b));

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 12, orbit: { distance: 8, pitch: -30 } });
  const { app } = scene;
  const out = createLog(el, ctx, 6);

  // Pass the app: createScript(name) alone would register on the global application.
  const Pulser = pc.createScript('pulser', app)!;
  Pulser.attributes.add('speed', { type: 'number', default: 1.5 });
  Pulser.attributes.add('mode', { type: 'number', default: 0, enum: [{ smooth: 0 }, { stepped: 1 }] });
  Pulser.attributes.add('tint', { type: 'rgba', default: [1, 0.5, 0.2, 1] });
  Pulser.attributes.add('partner', { type: 'entity' });
  Pulser.attributes.add('limits', {
    type: 'json',
    schema: [
      { name: 'min', type: 'number', default: 0.6 },
      { name: 'max', type: 'number', default: 1.5 },
    ],
  });
  Pulser.attributes.add('wave', { type: 'curve' });

  Pulser.prototype.initialize = function (this: any) {
    this.t = Math.random();
    paint(this);
    // Classic scripts fire attr:[name] for one attribute and attr for all of them.
    this.on('attr:speed', (value: number, prev: number) => out.log(`${this.entity.name} attr:speed ${prev} -> ${value}`));
    this.on('attr:mode', (value: number) => out.log(`${this.entity.name} attr:mode -> ${value}`));
    this.on('attr', (name: string) => {
      if (name === 'tint') {
        out.log(`${this.entity.name} attr tint changed`);
        paint(this);
      }
    });
  };
  Pulser.prototype.update = function (this: any, dt: number) {
    this.t = (this.t + dt * this.speed * 0.3) % 1;
    let k = this.wave.value(this.t);
    if (this.mode === 1) k = Math.round(k * 4) / 4;
    const s = pc.math.lerp(this.limits.min, this.limits.max, k);
    this.entity.setLocalScale(s, s, s);
    if (this.partner) app.drawLine(this.entity.getPosition(), this.partner.getPosition(), new pc.Color(this.tint.r, this.tint.g, this.tint.b));
  };

  const wave = { keys: [0, 0, 0.5, 1, 1, 0], type: pc.CURVE_SMOOTHSTEP };
  const a = addBox(app.root, 'a', '#ffffff', [-2, 1, 0]);
  const b = addBox(app.root, 'b', '#ffffff', [2, 1, 0]);
  for (const e of [a, b]) e.addComponent('script');
  // Attribute values go in `attributes`; the partner attribute takes an Entity.
  const first = a.script!.create('pulser', { attributes: { speed: 1.5, tint: [1, 0.5, 0.2, 1], wave, partner: b } })!;
  b.script!.create('pulser', { attributes: { speed: 1, tint: [0.3, 0.7, 1, 1], wave, partner: a, limits: { min: 0.3, max: 1.8 } } });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const attrs = first as unknown as { speed: number; mode: number; tint: pc.Color };
    panel.slider('a.speed', 0, 4, 0.1, attrs.speed, (v) => (attrs.speed = v));
    panel.select('a.mode', ['smooth', 'stepped'] as const, 'smooth', (v) => (attrs.mode = v === 'smooth' ? 0 : 1));
    panel.button('a.tint = random', () => (attrs.tint = new pc.Color(Math.random(), Math.random(), Math.random())));
  }
  return () => scene.dispose();
};

export default mount;
