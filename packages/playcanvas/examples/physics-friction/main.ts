// Friction on a tilting ramp, rolling friction on the floor
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn } from '../../shared/physics.ts';

const BOX_FRICTION = [0.05, 0.4, 0.9];
const ROLLING = [0, 0.1, 0.5];
const LANES = [-3, -2, -1, 1, 2, 3];
const RAMP = { x: -3.5, length: 6.5, y: 1.4 };

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 19, target: [0, 1, 0], floor: 18, yaw: 35 });
  const { app } = scene;
  let angle = 22;

  const ramp = addBody(app, { type: 'static', name: 'ramp', size: [RAMP.length, 0.4, 8], colour: '#59627a', body: { friction: 1 } });
  // A static body does not follow its entity; teleport moves entity and body together.
  const tilt = (): void => ramp.rigidbody!.teleport(new pc.Vec3(RAMP.x, RAMP.y, 0), new pc.Vec3(0, 0, -angle));

  const boxes = BOX_FRICTION.map((f, i) => addBody(app, { name: `box f=${f}`, size: 0.8, colour: PALETTE[i]!, body: { friction: f, mass: 1 } }));
  const spheres = ROLLING.map((r, i) => addBody(app, { shape: 'sphere', name: `sphere rf=${r}`, size: 0.8, colour: PALETTE[i + 3]!, body: { friction: 0.5, rollingFriction: r, mass: 1 } }));

  // A point on the ramp surface: slide `along` metres from the ramp centre and sit `up` above the surface.
  const onRamp = (along: number, up: number, z: number): [number, number, number] => {
    const a = (angle * Math.PI) / 180;
    return [RAMP.x + along * Math.cos(a) + up * Math.sin(a), RAMP.y - along * Math.sin(a) + up * Math.cos(a), z];
  };
  const reset = (): void => {
    tilt();
    [...boxes, ...spheres].forEach((e, i) => respawn(e, onRamp(-2.6, 0.7, LANES[i]! * 1.2), [0, 0, -angle]));
  };
  reset();
  every(app, 7, reset);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('ramp angle (degrees)', 5, 40, 1, angle, (v) => {
      angle = v;
      reset();
    });
    panel.row();
    panel.readout('boxes: friction 0.05 / 0.4 / 0.9    spheres: rollingFriction 0 / 0.1 / 0.5');
    panel.button('Release again', reset);
  }

  return () => scene.dispose();
};

export default mount;
