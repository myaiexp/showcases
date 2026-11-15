// Slider joint: a drawer on a rail, with limits and a position motor
import { Vector3 } from '@zephyr3d/base';
import { Joint, Mesh, NodePhysics } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, colliderOf, dynBall, dynBox, floor, GREY, launch, mat, orbit, ORANGE, startPhysics, YELLOW } from '../../shared/phys-kit.ts';
import { BoxShape } from '@zephyr3d/scene';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 12, 8);
  const readout = stage.readout();

  // A drawer: a dynamic box with a joint node (a child) whose local X axis is the rail
  const drawer = dynBox(kit, new Vector3(1.6, 0.35, 1.4), new Vector3(0, 0.6, 0), BLUE, 5);
  colliderOf(drawer).friction = 1;
  const rail = new Mesh(kit.scene, new BoxShape({ size: 4.4, sizeY: 0.05, sizeZ: 0.05 }), mat(GREY));
  rail.parent = drawer;
  rail.position.setXYZ(0.9, -0.2, 0);
  cast(kit, rail);
  const joint = new Joint();
  joint.type = 'slider';
  joint.axis = new Vector3(1, 0, 0);
  // Limits are in metres for a slider; the angle-0 pose is where the joint was made
  joint.limitsEnabled = true;
  joint.lowerLimit = -0.2;
  joint.upperLimit = 2;
  joint.motorMode = 'position';
  joint.motorTarget = 0;
  joint.motorStiffness = 200;
  joint.motorDamping = 40;
  joint.motorMaxForce = 0;
  rail.physics = new NodePhysics({ joint });

  // Things on the drawer ride along on friction
  dynBall(kit, 0.2, new Vector3(-0.4, 1.0, 0.2), ORANGE, 0.5);
  dynBox(kit, 0.35, new Vector3(0.4, 0.98, -0.2), YELLOW, 0.5);

  let target = 0;
  let t = 0;
  let motor = true;
  kit.myApp.on('tick', (dtMs: number) => {
    t += dtMs / 1000;
    if (stage.preview) target = 0.9 + 0.9 * Math.sin(t * 0.8);
    joint.motorTarget = target;
    const text = `slider position ${joint.position.toFixed(2)} m  (limits -0.2 .. 2, motor ${motor ? 'on' : 'off'})`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    slider(stage.bar, 'Target (m)', [-0.2, 2, 0.05], target, (v) => (target = v));
    toggle(stage.bar, 'Motor', true, (v) => {
      motor = v;
      joint.motorMode = v ? 'position' : 'off';
    });
    toggle(stage.bar, 'Limits', true, (v) => (joint.limitsEnabled = v));
  }

  orbit(kit, new Vector3(2, 3.2, 7), new Vector3(0.8, 0.6, 0));
  launch(kit);
});
