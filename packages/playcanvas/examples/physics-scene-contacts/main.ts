// One contact listener on the rigidbody system, drawn as impulse-scaled normals
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn, type ShapeKind } from '../../shared/physics.ts';

const SHAPES: ShapeKind[] = ['box', 'sphere', 'capsule', 'cylinder', 'cone'];
const LIFE = 0.6;

interface Spark {
  from: pc.Vec3;
  to: pc.Vec3;
  impulse: number;
  age: number;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, pitch: -32, target: [0, 1, 0], floor: 12 });
  const { app, physics } = scene;
  let threshold = 0.8;
  let hardest = 0;
  let seen = 0;
  const sparks: Spark[] = [];

  const bodies = Array.from({ length: 14 }, (_, i) =>
    addBody(app, { shape: SHAPES[i % SHAPES.length], size: 0.7, colour: PALETTE[i % PALETTE.length], body: { mass: 1, restitution: 0.35, friction: 0.5 } }),
  );
  const rain = (): void =>
    bodies.forEach((b, i) => respawn(b, [(Math.random() - 0.5) * 6, 3 + i * 0.9, (Math.random() - 0.5) * 6], [Math.random() * 180, 0, Math.random() * 180]));
  rain();
  every(app, 7, rain);

  // Fires once per contact point, every step, for every pair of touching bodies in the scene.
  const onContact = (result: pc.SingleContactResult): void => {
    seen++;
    hardest = Math.max(hardest, result.impulse);
    if (result.impulse < threshold || sparks.length > 160) return;
    const length = 0.25 + Math.min(result.impulse, 8) * 0.12;
    sparks.push({ from: result.pointA.clone(), to: result.pointA.clone().add(result.normal.clone().mulScalar(length)), impulse: result.impulse, age: 0 });
  };
  physics.on('contact', onContact);

  const colour = new pc.Color();
  let readout: HTMLElement | null = null;
  app.on('update', (dt: number) => {
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]!;
      s.age += dt;
      if (s.age > LIFE) {
        sparks.splice(i, 1);
        continue;
      }
      const heat = Math.min(1, s.impulse / 6);
      const fade = 1 - s.age / LIFE;
      colour.set(fade, (1 - heat * 0.8) * fade, 0.2 * fade);
      app.drawLine(s.from, s.to, colour, false);
    }
    if (readout) readout.textContent = `${seen} contact callbacks, strongest impulse ${hardest.toFixed(1)}`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('draw above impulse', 0.1, 6, 0.1, threshold, (v) => (threshold = v));
    panel.button('Rain again', rain);
    panel.row();
    readout = panel.readout();
  }

  return () => {
    physics.off('contact', onContact);
    scene.dispose();
  };
};

export default mount;
