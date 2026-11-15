// Suspension tuning: three cars with soft, medium and stiff springs cross speed bumps
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, floor, GREY, launch, orbit, ORANGE, RED, startPhysics, staticBox } from '../../shared/phys-kit.ts';
import { buildCar, type Car } from '../../shared/phys-car.ts';

const SETTINGS = [
  { name: 'soft', color: ORANGE, stiffness: 12, compression: 1.2, relaxation: 1.8 },
  { name: 'default', color: BLUE, stiffness: 30, compression: 2.2, relaxation: 3.3 },
  { name: 'stiff', color: RED, stiffness: 90, compression: 3.5, relaxation: 5 },
];

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 30, top: 10 });
  floor(kit, 60, 24);
  stage.caption('suspensionStiffness 12 · 30 · 90, same speed bumps');

  // Three bumps across every lane: a car's wheels meet them one axle at a time
  for (const x of [0, 4, 8]) staticBox(kit, new Vector3(0.5, 0.3, 14), new Vector3(x, 0.05, 0), GREY);

  const cars: Car[] = [];
  const build = (): void => {
    for (const [i, s] of SETTINGS.entries()) {
      // Wheel properties are tuned as the wheel is built; heading π/2 turns the car's +Z front towards +X
      const car = buildCar(kit, {
        position: new Vector3(-9, 1.1, (i - 1) * 4),
        heading: Math.PI / 2,
        color: s.color,
        tune: (w) => {
          w.suspensionStiffness = s.stiffness;
          w.suspensionCompression = s.compression;
          w.suspensionRelaxation = s.relaxation;
        },
      });
      cars.push(car);
    }
  };
  build();

  kit.myApp.on('tick', () => {
    for (const car of cars) {
      // Constant speed: cruise at 9 m/s straight on
      car.vehicle.throttle = Math.max(0, Math.min(1, (9 - car.vehicle.speed) * 0.5));
      // Start over once they have passed the bumps and rolled off the far end
      if (car.node.position.x > 15) {
        car.node.position.setXYZ(-9, 1.1, car.node.position.z);
        car.node.rotation = Quaternion.fromAxisAngle(Vector3.axisPY(), Math.PI / 2);
        car.body.setLinearVelocity(Vector3.zero());
        car.body.setAngularVelocity(Vector3.zero());
      }
    }
  });

  if (stage.bar) {
    // The middle car's springs, changed while it drives
    const set = (key: 'suspensionStiffness' | 'suspensionCompression' | 'suspensionRelaxation') => (v: number) => {
      for (const { wheel } of cars[1]!.wheels) wheel[key] = v;
    };
    slider(stage.bar, 'Default car: stiffness', [5, 120, 1], 30, set('suspensionStiffness'));
    slider(stage.bar, 'compression', [0.5, 6, 0.1], 2.2, set('suspensionCompression'));
    slider(stage.bar, 'relaxation', [0.5, 8, 0.1], 3.3, set('suspensionRelaxation'));
  }

  orbit(kit, new Vector3(3, 7, 16), new Vector3(3, 0.5, 0));
  launch(kit);
});
