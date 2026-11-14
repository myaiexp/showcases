// applyTorque every frame against one applyTorqueImpulse, about a world axis
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsScene, every, respawn } from '../../shared/physics.ts';

type Axis = 'X' | 'Y' | 'Z';
const AXES: Record<Axis, [number, number, number]> = { X: [1, 0, 0], Y: [0, 1, 0], Z: [0, 0, 1] };

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 12, pitch: -20, target: [0, 2, 0], floor: 12, yaw: 20 });
  const { app } = scene;
  let axis: Axis = 'Y';
  let strength = 3;
  const speeds: HTMLElement[] = [];

  // A propeller: a bar with one bright tip, so the spin direction reads. Pinned in place by a zero linear factor.
  const propeller = (x: number, colour: string, name: string): pc.Entity => {
    const e = new pc.Entity(name);
    e.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(1.2, 0.15, 0.3) });
    e.addComponent('rigidbody', { type: 'dynamic', mass: 1, gravityScale: 0, angularDamping: 0.35, linearFactor: new pc.Vec3(0, 0, 0) });
    addShape(e, 'box', material(colour), [0, 0, 0], [2.4, 0.3, 0.6], 'blade');
    addShape(e, 'sphere', material('#ffffff', { emissive: '#ffffff' }), [1.2, 0, 0], 0.45, 'tip');
    e.setPosition(x, 2.2, 0);
    app.root.addChild(e);
    return e;
  };
  const driven = propeller(-3, '#e8794a', 'applyTorque');
  const kicked = propeller(3, '#4ab3e8', 'applyTorqueImpulse');

  const restart = (): void => {
    respawn(driven, [-3, 2.2, 0]);
    respawn(kicked, [3, 2.2, 0]);
    const [x, y, z] = AXES[axis];
    // One kick of spin, then it is left to damp out.
    kicked.rigidbody!.applyTorqueImpulse(x * strength * 0.8, y * strength * 0.8, z * strength * 0.8);
  };

  app.on('update', () => {
    // Torque is the rotational force: apply it every frame and the spin keeps building.
    const [x, y, z] = AXES[axis];
    driven.rigidbody!.applyTorque(x * strength, y * strength, z * strength);
    if (speeds.length) {
      speeds[0]!.textContent = `applyTorque: ${driven.rigidbody!.angularVelocity.length().toFixed(1)} rad/s`;
      speeds[1]!.textContent = `applyTorqueImpulse: ${kicked.rigidbody!.angularVelocity.length().toFixed(1)} rad/s`;
    }
  });
  restart();
  every(app, 6, restart);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select<Axis>('world axis', ['X', 'Y', 'Z'], axis, (v) => {
      axis = v;
      restart();
    });
    panel.slider('strength', 1, 10, 0.5, strength, (v) => (strength = v));
    panel.button('Restart', restart);
    panel.row();
    speeds.push(panel.readout(), panel.readout());
  }

  return () => scene.dispose();
};

export default mount;
