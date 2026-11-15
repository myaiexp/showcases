// Drive layouts: wheel drive shares and steer shares set front, rear and four-wheel layouts
import { Vector3 } from '@zephyr3d/base';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { floor, launch, startPhysics, GREY, staticBox } from '../../shared/phys-kit.ts';
import { autoDrive, buildCar, chaseCamera } from '../../shared/phys-car.ts';

type Drive = 'front' | 'rear' | 'all';
type Steer = 'front' | 'rear' | 'four-wheel';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 40, top: 14 });
  floor(kit, 80, 80);
  // A few posts to circle round, so the line the car takes is easy to read
  for (const [x, z] of [[0, 0], [7, 7], [-7, -7]] as const) staticBox(kit, new Vector3(0.6, 2, 0.6), new Vector3(x, 1, z), GREY);

  const car = buildCar(kit, { position: new Vector3(14, 1.2, 0), heading: 0 });
  const readout = stage.readout();
  let drive: Drive = 'rear';
  let steer: Steer = 'front';

  // Wheel.drive is a share of vehicle.maxEngineForce: 0.5 on a pair, or 0.25 on all four.
  // Wheel.steer is a share of maxSteerAngle: -1 steers against the front wheels.
  const apply = (): void => {
    for (const { wheel, front } of car.wheels) {
      wheel.drive = drive === 'all' ? 0.25 : (drive === 'front') === front ? 0.5 : 0;
      wheel.steer = steer === 'four-wheel' ? (front ? 1 : -1) : (steer === 'front') === front ? 1 : 0;
    }
    const text = `${drive} wheel drive · ${steer} steering`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  };
  apply();

  if (stage.bar) {
    select<Drive>(stage.bar, 'Drive', ['front', 'rear', 'all'], drive, (v) => ((drive = v), apply()));
    select<Steer>(stage.bar, 'Steering', ['front', 'rear', 'four-wheel'], steer, (v) => ((steer = v), apply()));
  } else {
    stage.every(5000, (i) => {
      drive = (['rear', 'front', 'all'] as const)[i % 3]!;
      steer = (['front', 'rear', 'four-wheel'] as const)[i % 3]!;
      apply();
    });
  }

  const follow = chaseCamera(kit, car.node, 10, 5);
  kit.myApp.on('tick', (dtMs: number) => {
    autoDrive(car, 14, 6);
    // Rear wheels alone steer the other way round: the autopilot has to counter-steer
    if (steer === 'rear') car.vehicle.steering = -car.vehicle.steering;
    follow(dtMs);
  });
  launch(kit);
});
