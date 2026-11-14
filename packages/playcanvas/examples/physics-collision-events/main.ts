// Per-entity collision events: start with impulse, contact every step, end
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addBody, createPhysicsScene, every, PALETTE, respawn, tint } from '../../shared/physics.ts';

const MASSES = [1, 3, 9];

const mount: Mount = async (el, ctx) => {
  const scene = await createPhysicsScene(el, ctx, { distance: 15, target: [0, 1.5, 0], floor: 14, yaw: 20 });
  const { app } = scene;
  const stats = MASSES.map(() => ({ starts: 0, steps: 0, ends: 0, impulse: 0 }));
  const glow = MASSES.map(() => 0);
  const readouts: HTMLElement[] = [];
  const handles: pc.EventHandle[] = [];

  const pads = MASSES.map((_, i) => addBody(app, { type: 'static', name: `pad${i}`, size: [2.6, 0.4, 2.6], position: [(i - 1) * 4.2, 0.2, 0], colour: '#59627a' }));
  const balls = MASSES.map((m, i) => {
    const ball = addBody(app, { shape: 'sphere', name: `ball ${m} kg`, size: 0.7 + m * 0.07, colour: PALETTE[i]!, body: { mass: m, restitution: 0.55 } });
    // Each event is fired on the collision component and on the rigidbody component of both entities.
    handles.push(
      ball.collision!.on('collisionstart', (result: pc.ContactResult) => {
        if (result.other !== pads[i]) return; // the floor reports too
        const hardest = Math.max(...result.contacts.map((c) => c.impulse));
        const s = stats[i]!;
        s.starts++;
        s.impulse = hardest;
        glow[i] = Math.min(1, hardest / (m * 16)); // scale by mass so every pad flashes
        tint(ball, '#ffffff', '#555555');
      }),
      ball.collision!.on('contact', (result: pc.ContactResult) => result.other === pads[i] && stats[i]!.steps++),
      ball.collision!.on('collisionend', (other: pc.Entity) => {
        if (other !== pads[i]) return;
        stats[i]!.ends++;
        tint(ball, PALETTE[i]!);
      }),
    );
    return ball;
  });

  const drop = (): void => balls.forEach((b, i) => respawn(b, [(i - 1) * 4.2, 5, 0]));
  drop();
  every(app, 5, drop);

  app.on('update', (dt: number) => {
    pads.forEach((pad, i) => {
      glow[i] = Math.max(0, glow[i]! - dt * 2.5);
      const m = pad.render!.meshInstances[0]!.material as pc.StandardMaterial;
      m.emissive.set(glow[i]! * 0.95, glow[i]! * 0.6, glow[i]! * 0.2);
      m.update();
      const s = stats[i]!;
      if (readouts[i]) readouts[i]!.textContent = `${MASSES[i]} kg: start ${s.starts} (impulse ${s.impulse.toFixed(1)})  contact steps ${s.steps}  end ${s.ends}`;
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    for (let i = 0; i < MASSES.length; i++) {
      readouts.push(panel.readout());
      panel.row();
    }
    panel.button('Drop again', drop);
  }

  return () => {
    // The app is destroyed with the stage; handles are released first for tidiness.
    handles.forEach((h) => h.off());
    scene.dispose();
  };
};

export default mount;
