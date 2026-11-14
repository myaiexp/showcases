// Fixed joints with a breakImpulse weld a tower; refreshFrames welds it again
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, addMarker, createPhysicsScene, every, PALETTE, respawn, tint } from '../../shared/physics.ts';

const LEVELS = 5;

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 14, pitch: -20, target: [0, 2, 0], floor: 16, yaw: 25, autoRotate: 3 });
  const { app } = scene;
  let breakImpulse = 15;
  let broken = 0;
  let readout: HTMLElement | null = null;

  const blocks = Array.from({ length: LEVELS }, (_, i) => addBody(app, { name: `block${i}`, size: 1, position: [0, 0.5 + i, 0], colour: PALETTE[i % PALETTE.length], body: { mass: 1, friction: 0.7 } }));
  const ball = addBody(app, { shape: 'sphere', name: 'wrecking ball', size: 1.1, position: [-8, 2, 0], colour: '#ffffff', body: { mass: 8, restitution: 0.2 } });

  // One fixed joint per seam: block i to the block below it, and the first block to the static floor.
  const welds = blocks.map((block, i) => {
    const e = new pc.Entity(`weld${i}`);
    e.setPosition(0, i, 0);
    app.root.addChild(e);
    e.addComponent('joint', { type: pc.JOINTTYPE_FIXED, entityA: block, entityB: i ? blocks[i - 1] : scene.floor!, breakImpulse });
    const joint = e.joint!;
    joint.on('break', () => broken++);
    const dot = addMarker(app, '#4cd685', 0.25);
    dot.setPosition(0, i + 0.0001, 0.6);
    return { joint, dot };
  });

  const reset = (): void => {
    blocks.forEach((b, i) => respawn(b, [0, 0.5 + i, 0]));
    broken = 0;
    // The frames were captured when the joints were created; this re-captures them and re-arms a broken one.
    for (const w of welds) w.joint.refreshFrames();
    respawn(ball, [-8, 2, 0]);
    ball.rigidbody!.linearVelocity = new pc.Vec3(13, 1, 0);
  };
  reset();
  every(app, 6, reset);

  app.on('update', () => {
    for (const w of welds) tint(w.dot, w.joint.isBroken ? '#ff4d4d' : '#4cd685', w.joint.isBroken ? '#ff4d4d' : '#4cd685');
    if (readout) readout.textContent = `${broken} of ${LEVELS} welds broken (break events)`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('breakImpulse', 2, 200, 1, breakImpulse, (v) => {
      breakImpulse = v;
      for (const w of welds) w.joint.breakImpulse = v;
    });
    panel.button('Reset and fire', reset);
    panel.row();
    readout = panel.readout();
  }

  return () => scene.dispose();
};

export default mount;
