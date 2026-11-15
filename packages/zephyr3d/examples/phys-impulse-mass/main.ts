// Impulses: one applyImpulse, three masses, three different speeds
import { Vector3 } from '@zephyr3d/base';
import type { Mesh } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBall, floor, launch, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

const MASSES = [1, 4, 16];
const COLORS = [ORANGE, YELLOW, BLUE];

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 14 });
  floor(kit, 28, 9);

  let balls: Mesh[] = [];
  let impulse = 8; // N·s
  const readout = stage.readout();
  // An impulse changes velocity by impulse / mass: heavier bodies move less
  const kick = (): void => {
    for (const b of balls) b.physics!.body!.applyImpulse(new Vector3(impulse, 0, 0));
  };
  respawn(
    kit,
    () => {
      balls = MASSES.map((m, i) => {
        const ball = dynBall(kit, 0.35 + i * 0.12, new Vector3(-6, 0.5, -2.4 + i * 2.4), COLORS[i]!, m);
        colliderOf(ball).friction = 0.1;
        ball.physics!.body!.linearDamping = 0.5;
        return ball;
      });
      return balls;
    },
    7000,
    'Reset',
  );

  // Cards press the button for themselves, a second after each reset
  if (stage.preview) stage.every(1000, (i) => i % 7 === 1 && kick());

  kit.myApp.on('tick', () => {
    const text = balls.map((b, i) => `${MASSES[i]} kg: ${b.physics!.body!.getLinearVelocity().x.toFixed(1)} m/s`).join('   ');
    stage.caption(text);
    if (readout) readout.textContent = text;
  });
  if (stage.bar) {
    slider(stage.bar, 'Impulse (N·s)', [2, 16, 1], impulse, (v) => (impulse = v));
    button(stage.bar, 'Kick', kick);
  }

  orbit(kit, new Vector3(0, 6, 12), new Vector3(0, 0.5, 0));
  launch(kit);
});
