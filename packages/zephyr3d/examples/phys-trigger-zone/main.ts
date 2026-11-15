// Triggers: a zone that detects bodies entering and leaving without blocking them
import { Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, colliderOf, dynBall, dynBox, floor, launch, mat, orbit, ORANGE, respawn, startPhysics, tint, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 8);
  stage.caption('a trigger collider blocks nothing; bodies inside turn pink');

  // The zone: a collider with isTrigger set, and no RigidBody
  const zone = new Mesh(kit.scene, new BoxShape({ size: 3, sizeY: 2, sizeZ: 3 }), mat([0.2, 0.8, 1], 0.22));
  zone.castShadow = false;
  zone.position.setXYZ(0, 1, 0);
  const trigger = new Collider();
  trigger.size = new Vector3(3, 2, 3);
  trigger.isTrigger = true;
  zone.physics = new NodePhysics({ colliders: [trigger] });

  const readout = stage.readout();
  const inside = new Set<Mesh>();
  const show = (): void => {
    stage.caption(`inside the zone: ${inside.size}`);
    if (readout) readout.textContent = `inside: ${inside.size}`;
  };
  // Both sides receive triggerenter / triggerexit, on the physics data of their nodes
  zone.physics.on('triggerenter', (ev) => {
    const node = ev.otherNode;
    if (node?.isMesh() && !inside.has(node)) {
      inside.add(node);
      tint(node, [1, 0.2, 0.6]);
      show();
    }
  });
  zone.physics.on('triggerexit', (ev) => {
    const node = ev.otherNode;
    if (node?.isMesh() && inside.delete(node)) {
      tint(node, (node.name === 'ball' ? ORANGE : YELLOW) as [number, number, number]);
      show();
    }
  });

  respawn(
    kit,
    () => {
      inside.clear();
      const nodes = [];
      for (let i = 0; i < 3; i++) {
        const ball = dynBall(kit, 0.35, new Vector3(-0.9 + i * 0.9, 4 + i * 1.5, 0.3 * i - 0.3), ORANGE);
        ball.name = 'ball';
        colliderOf(ball).restitution = 0.3;
        nodes.push(ball);
      }
      const box = dynBox(kit, 0.6, new Vector3(-4, 1, 0), YELLOW);
      box.physics!.body!.setLinearVelocity(new Vector3(5, 3, 0)); // thrown through the zone
      nodes.push(box);
      nodes.push(dynBox(kit, 0.5, new Vector3(0.4, 7, 0.2), BLUE));
      return nodes;
    },
    7000,
    'Drop again',
  );
  show();

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 1, 0));
  launch(kit);
});
