// Scene physics settings: gravity and the fixed time step through ScenePhysicsSettings
import { Vector3 } from '@zephyr3d/base';
import { ScenePhysicsSettings } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBall, dynBox, floor, GREEN, launch, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

const GRAVITIES = { Earth: -9.81, Moon: -1.62, Jupiter: -24.8, Zero: 0 } as const;
type Planet = keyof typeof GRAVITIES;
const STEPS = { '1/120': 1 / 120, '1/60': 1 / 60, '1/20': 1 / 20 } as const;
type Step = keyof typeof STEPS;

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 12, 8);

  let planet: Planet = 'Earth';
  let step: Step = '1/60';
  // Saved with the scene; null means the defaults. Changes apply from the next frame.
  const apply = (): void => {
    const settings = new ScenePhysicsSettings();
    settings.gravity = new Vector3(0, GRAVITIES[planet], 0);
    settings.fixedTimeStep = STEPS[step];
    kit.scene.physicsSettings = settings;
    stage.caption(`gravity ${GRAVITIES[planet]} m/s² (${planet}) · fixed step ${step} s`);
  };
  apply();

  const reset = respawn(
    kit,
    () => {
      const nodes = [];
      for (let i = 0; i < 4; i++) {
        const ball = dynBall(kit, 0.35, new Vector3(-3.6 + i * 2.4, 1 + (i % 2), 0), [ORANGE, YELLOW, BLUE, GREEN][i]!);
        colliderOf(ball).restitution = 0.8;
        ball.physics!.body!.setLinearVelocity(new Vector3(0, 4 + i * 0.4, 0));
        nodes.push(ball);
      }
      nodes.push(dynBox(kit, 0.6, new Vector3(0, 3, 0), YELLOW));
      return nodes;
    },
    16000,
    'Throw again',
  );

  if (stage.bar) {
    select(stage.bar, 'Gravity', Object.keys(GRAVITIES) as Planet[], planet, (v) => {
      planet = v;
      apply();
      reset();
    });
    select(stage.bar, 'Fixed step', Object.keys(STEPS) as Step[], step, (v) => {
      step = v;
      apply();
    });
  } else {
    // Cards walk through the planets, throwing the balls up again each time
    stage.every(4000, (i) => {
      planet = (['Earth', 'Moon', 'Jupiter', 'Zero'] as const)[i % 4]!;
      apply();
      reset();
    });
  }

  orbit(kit, new Vector3(0, 5, 11), new Vector3(0, 3.5, 0));
  launch(kit);
});
