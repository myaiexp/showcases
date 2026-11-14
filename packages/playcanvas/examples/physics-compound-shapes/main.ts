// A compound shape: child collision shapes combined into one dynamic body
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { createPhysicsScene, every, respawn } from '../../shared/physics.ts';

type V3 = [number, number, number];

/** A child entity with a primitive collision shape and a matching render box or sphere. */
function part(parent: pc.Entity, mat: pc.Material, at: V3, half: V3 | number): pc.Entity {
  const e = new pc.Entity('part');
  const sphere = typeof half === 'number';
  e.addComponent('collision', sphere ? { type: 'sphere', radius: half } : { type: 'box', halfExtents: new pc.Vec3(...half) });
  e.addComponent('render', { type: sphere ? 'sphere' : 'box', material: mat, castShadows: true });
  e.setLocalScale(...(sphere ? ([half * 2, half * 2, half * 2] as V3) : (half.map((h) => h * 2) as V3)));
  e.setLocalPosition(...at);
  parent.addChild(e);
  return e;
}

/** The parent holds the compound collision and the body; it needs no render of its own. */
function compound(name: string, mass: number): pc.Entity {
  const e = new pc.Entity(name);
  e.addComponent('collision', { type: 'compound' });
  e.addComponent('rigidbody', { type: 'dynamic', mass, friction: 0.6, restitution: 0.15 });
  return e;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 14, target: [0, 1, 0], floor: 14 });
  const { app } = scene;

  const mT = material('#e8794a');
  const tee = compound('T', 3);
  part(tee, mT, [0, 0.5, 0], [1, 0.2, 0.25]);
  part(tee, mT, [0, -0.2, 0], [0.2, 0.5, 0.25]);

  // Parts are placed around the parent origin, which is the body's centre of mass.
  const mC = material('#4ab3e8');
  const chair = compound('chair', 5);
  const oy = -0.45;
  part(chair, mC, [0, 0.45 + oy, 0], [0.4, 0.05, 0.4]);
  part(chair, mC, [0, 0.9 + oy, -0.35], [0.4, 0.4, 0.05]);
  for (const [x, z] of [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]] as const) part(chair, mC, [x, 0.2 + oy, z], [0.05, 0.2, 0.05]);

  const mD = material('#a78bfa');
  const bell = compound('dumbbell', 4);
  const balls = [part(bell, mD, [-1.2, 0, 0], 0.5), part(bell, mD, [1.2, 0, 0], 0.5)];
  const bar = part(bell, mD, [0, 0, 0], [1.2, 0.12, 0.12]);

  // Each parent joins the scene once all of its shapes are in place.
  for (const e of [tee, chair, bell]) app.root.addChild(e);

  // Moving a child of a dynamic compound updates its shape within the body and wakes the parent.
  const spread = (s: number): void => {
    balls[0]!.setLocalPosition(-s, 0, 0);
    balls[1]!.setLocalPosition(s, 0, 0);
    bar.collision!.halfExtents = new pc.Vec3(s, 0.12, 0.12);
    bar.setLocalScale(s * 2, 0.24, 0.24);
  };

  const drop = (): void => {
    respawn(tee, [-4, 4, 0], [Math.random() * 90, Math.random() * 90, Math.random() * 90]);
    respawn(chair, [0, 4.5, 0], [Math.random() * 40, Math.random() * 90, Math.random() * 40]);
    respawn(bell, [4, 4, 0], [Math.random() * 90, Math.random() * 90, 0]);
  };
  drop();
  every(app, 5, drop);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('dumbbell spread', 0.6, 1.8, 0.05, 1.2, spread);
    panel.button('Drop again', drop);
  }

  return () => scene.dispose();
};

export default mount;
