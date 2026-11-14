// Linear and angular factors lock movement or rotation per world axis
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, target: [0, 1.5, 0], floor: 14, yaw: 25 });
  const { app } = scene;

  const common = { mass: 1, restitution: 0.4, friction: 0.6 };
  const crates = [
    { name: 'free', x: -4, colour: '#e8794a', body: common },
    { name: 'XY plane only', x: 0, colour: '#4ab3e8', body: { ...common, linearFactor: new pc.Vec3(1, 1, 0), angularFactor: new pc.Vec3(0, 0, 1) } },
    { name: 'upright', x: 4, colour: '#7bc67b', body: { ...common, angularFactor: new pc.Vec3(0, 0, 0) } },
  ].map((c) => ({ ...c, entity: addBody(app, { name: c.name, size: 1.2, colour: c.colour, body: c.body }) }));

  const throwAll = (): void => {
    for (const c of crates) {
      respawn(c.entity, [c.x, 4, 0], [20, 0, 25]);
      // The same velocity for all three; the factors decide how much of it each body keeps.
      c.entity.rigidbody!.linearVelocity = new pc.Vec3(1.2, 0, 3);
      c.entity.rigidbody!.angularVelocity = new pc.Vec3(3, 2, 4);
    }
  };
  throwAll();
  every(app, 5, throwAll);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('left to right: free, linearFactor (1,1,0) + angularFactor (0,0,1), angularFactor (0,0,0)');
    panel.row();
    panel.button('Throw again', throwAll);
  }

  return () => scene.dispose();
};

export default mount;
