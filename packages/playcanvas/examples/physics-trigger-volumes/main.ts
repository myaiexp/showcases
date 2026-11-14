// A collision component with no rigidbody: triggerenter and triggerleave
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn, tint } from '../../shared/physics.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 16, target: [0, 2, 0], floor: 14, pitch: -20, yaw: 15, autoRotate: 3 });
  const { app } = scene;
  let width = 1.6;
  let time = 0;
  const inside = new Set<pc.Entity>();
  const counts = { enter: 0, leave: 0, checkpoint: 0 };
  let readout: HTMLElement | null = null;

  // The trigger: shape and a translucent mesh, no rigidbody.
  const gateMaterial = material('#4cd685', { opacity: 0.22, emissive: '#1a5a38' });
  const gate = new pc.Entity('gate');
  gate.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(width, 1.6, 1.6) });
  gate.addComponent('render', { type: 'box', material: gateMaterial, castShadows: false });
  gate.setLocalScale(width * 2, 3.2, 3.2);
  gate.tags.add('checkpoint');
  app.root.addChild(gate);

  // Static bodies never fire triggers, even when the gate passes straight over them.
  addBody(app, { type: 'static', name: 'pillar', size: [0.6, 3, 0.6], position: [0, 1.5, 0], colour: '#59627a' });

  const balls = PALETTE.map((c, i) => addBody(app, { shape: 'sphere', name: `ball${i}`, size: 0.7, colour: c, body: { mass: 1, restitution: 0.5 } }));
  const dropAll = (): void => balls.forEach((b, i) => respawn(b, [(i - 2.5) * 1.8, 6 + i * 1.5, (i % 2) * 0.8 - 0.4]));

  // Both sides hear the overlap: the trigger gets the ball, the ball gets the trigger.
  gate.collision!.on('triggerenter', (entity: pc.Entity) => {
    inside.add(entity);
    counts.enter++;
    tint(entity, '#ffffff', '#2b8a52');
  });
  gate.collision!.on('triggerleave', (entity: pc.Entity) => {
    inside.delete(entity);
    counts.leave++;
    tint(entity, PALETTE[balls.indexOf(entity)] ?? '#ffffff');
  });
  for (const ball of balls) {
    ball.rigidbody!.on('triggerenter', (trigger: pc.Entity) => {
      if (trigger.tags.has('checkpoint')) counts.checkpoint++;
    });
  }

  app.on('update', (dt: number) => {
    time += dt;
    // A trigger is an ordinary entity: move it with the transform API.
    gate.setPosition(Math.sin(time * 0.7) * 4, 1.7, 0);
    gateMaterial.opacity = inside.size ? 0.45 : 0.22;
    gateMaterial.update();
    if (readout) readout.textContent = `inside now ${inside.size}, triggerenter ${counts.enter}, triggerleave ${counts.leave}, tagged checkpoint seen by bodies ${counts.checkpoint}`;
  });
  dropAll();
  every(app, 5, dropAll);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('gate half width', 0.5, 3, 0.1, width, (v) => {
      width = v;
      // Primitive shapes ignore scale, so the shape and the mesh are sized separately.
      gate.collision!.halfExtents = new pc.Vec3(v, 1.6, 1.6);
      gate.setLocalScale(v * 2, 3.2, 3.2);
    });
    panel.button('Drop the balls', dropAll);
    panel.row();
    readout = panel.readout();
  }

  return () => scene.dispose();
};

export default mount;
