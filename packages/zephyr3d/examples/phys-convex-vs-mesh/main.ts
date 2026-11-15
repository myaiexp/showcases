// Mesh against convex colliders: a ring lets a ball through, its hull does not
import { Vector3 } from '@zephyr3d/base';
import { Collider, Mesh, NodePhysics, TorusShape } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, dynBall, floor, launch, mat, orbit, ORANGE, respawn, SLATE, startPhysics } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 14, 8);
  stage.caption('mesh: the ball falls through the hole · convex: the hull is solid');

  // The same ring twice. 'mesh' is a skin of triangles; 'convex' is the smallest convex shape around the vertices.
  const ring = (x: number, shape: 'mesh' | 'convex'): void => {
    const torus = new Mesh(kit.scene, new TorusShape({ outerRadius: 1.4, innerRadius: 0.35 }), mat(SLATE));
    torus.position.setXYZ(x, 0.6, 0);
    const collider = new Collider();
    collider.shape = shape;
    torus.physics = new NodePhysics({ colliders: [collider] });
    cast(kit, torus);
  };
  ring(-2.6, 'mesh');
  ring(2.6, 'convex');

  respawn(kit, () => [dynBall(kit, 0.3, new Vector3(-2.6, 4, 0), ORANGE), dynBall(kit, 0.3, new Vector3(2.6, 4, 0), BLUE)], 6000, 'Drop again');

  orbit(kit, new Vector3(0, 4.5, 8.5), new Vector3(0, 1, 0));
  launch(kit);
});
