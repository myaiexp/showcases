// Hinge joint: a door on its own joint node, with limits, hit by balls
import { Vector3 } from '@zephyr3d/base';
import { Joint, NodePhysics, Mesh } from '@zephyr3d/scene';
import { button, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { cylinderShape, dynBall, dynBox, discard, floor, GREY, launch, mat, orbit, ORANGE, startPhysics, YELLOW, cast } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 12);
  const readout = stage.readout();

  // The door is a dynamic box. The joint goes on a child node of its own: the
  // node's origin is the pivot and its Y axis the hinge axis. No connectedBody
  // means the door hangs on the world.
  const door = dynBox(kit, new Vector3(1.6, 2, 0.12), new Vector3(0, 1.02, 0), [0.6, 0.4, 0.25], 6);
  const hingeNode = new Mesh(kit.scene, cylinderShape(0.05, 2.1), mat(GREY));
  hingeNode.parent = door;
  hingeNode.position.setXYZ(-0.85, 0, 0);
  cast(kit, hingeNode);
  const hinge = new Joint();
  hinge.type = 'hinge';
  hinge.limitsEnabled = true;
  hinge.lowerLimit = -110; // degrees
  hinge.upperLimit = 110;
  hingeNode.physics = new NodePhysics({ joint: hinge });

  const balls: Mesh[] = [];
  const throwBall = (): void => {
    const side = balls.length % 2 ? -1 : 1;
    const b = dynBall(kit, 0.3, new Vector3(0.2 + side * 0.4, 1.2, 5), side > 0 ? ORANGE : YELLOW, 4);
    b.physics!.body!.setLinearVelocity(new Vector3(0, 0, -6));
    balls.push(b);
    if (balls.length > 4) discard(kit, balls.shift()!);
  };

  kit.myApp.on('tick', () => {
    const text = `hinge angle ${hinge.angle.toFixed(0)}°  (limits ${hinge.limitsEnabled ? '±110°' : 'off'})`;
    stage.caption(text);
    if (readout) readout.textContent = text;
  });

  if (stage.bar) {
    toggle(stage.bar, 'Limits', true, (v) => (hinge.limitsEnabled = v));
    button(stage.bar, 'Throw a ball', throwBall);
  } else {
    stage.every(2600, () => throwBall());
  }

  orbit(kit, new Vector3(2, 4, 8), new Vector3(0, 1, 0));
  launch(kit);
});
