// linearOffset and angularOffset move a collision shape, not its entity
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { material } from '../../shared/components.ts';
import { addBody, createPhysicsScene, every, respawn } from '../../shared/physics.ts';

const RAMP_TILT = -20;

/** A capsule collider on a body whose mesh origin is at the feet, with a ghost showing the collider. */
function character(app: pc.AppBase, name: string, x: number, colour: string, offset: pc.Vec3): pc.Entity {
  const e = new pc.Entity(name);
  e.addComponent('collision', { type: 'capsule', radius: 0.5, height: 2, axis: 1, linearOffset: offset });
  e.addComponent('rigidbody', { type: 'dynamic', mass: 1, angularFactor: new pc.Vec3(0, 0, 0), friction: 0.5 });
  // The mesh: a capsule lifted by one metre so that the entity origin is at its feet.
  const mesh = new pc.Entity('mesh');
  mesh.addComponent('render', { type: 'capsule', material: material(colour), castShadows: true });
  mesh.setLocalPosition(0, 1, 0);
  mesh.setLocalScale(0.9, 0.9, 0.9);
  e.addChild(mesh);
  // The collider, drawn as a translucent capsule at the same offset.
  const ghost = new pc.Entity('collider');
  ghost.addComponent('render', { type: 'capsule', material: material('#ffffff', { opacity: 0.22 }), castShadows: false });
  ghost.setLocalPosition(offset);
  e.addChild(ghost);
  e.setPosition(x, 4, 0);
  app.root.addChild(e);
  return e;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 17, target: [1.5, 1.5, 0], floor: 18, yaw: 15, autoRotate: 4 });
  const { app } = scene;

  const hovering = character(app, 'no offset', -5, '#e8794a', new pc.Vec3(0, 0, 0));
  const grounded = character(app, 'linearOffset', -2, '#7bc67b', new pc.Vec3(0, 1, 0));

  // A static ramp: the entity is not rotated, only its box collider is, by angularOffset.
  const ramp = new pc.Entity('ramp');
  ramp.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(3, 0.2, 1.8),
    angularOffset: new pc.Quat().setFromEulerAngles(0, 0, RAMP_TILT),
  });
  ramp.addComponent('rigidbody', { type: 'static', friction: 0.4 });
  const slab = new pc.Entity('slab');
  slab.addComponent('render', { type: 'box', material: material('#59627a'), castShadows: true });
  slab.setLocalScale(6, 0.4, 3.6);
  slab.setLocalEulerAngles(0, 0, RAMP_TILT);
  ramp.addChild(slab);
  ramp.setPosition(5, 1.3, 0);
  app.root.addChild(ramp);

  const ball = addBody(app, { shape: 'sphere', name: 'ball', size: 0.9, colour: '#f2c14e', body: { mass: 1, rollingFriction: 0.02 } });

  const reset = (): void => {
    respawn(hovering, [-5, 4, 0]);
    respawn(grounded, [-2, 4, 0]);
    respawn(ball, [2.8, 4, 0]);
  };
  reset();
  every(app, 5, reset);

  return () => scene.dispose();
};

export default mount;
