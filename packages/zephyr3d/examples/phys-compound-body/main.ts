// Compound bodies: child nodes with colliders, and a collider offset
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics, RigidBody, SphereShape } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, cast, floor, launch, mat, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit, 16, 12);
  stage.caption('children of a body add their colliders to it');

  const box = (parent: Mesh | null, size: Vector3, pos: Vector3, color: typeof ORANGE): Mesh => {
    const m = new Mesh(kit.scene, new BoxShape({ size: size.x, sizeY: size.y, sizeZ: size.z }), mat(color));
    if (parent) m.parent = parent;
    m.position.set(pos);
    const c = new Collider();
    c.size = size;
    m.physics = new NodePhysics({ colliders: [c] }); // no RigidBody: part of the parent's shape
    return m;
  };

  const build = (): Mesh[] => {
    // A "T": the stem owns the RigidBody, the bar is a child with only a Collider.
    // A rigid body's shape is its own colliders plus those of body-less children.
    const stem = box(null, new Vector3(0.4, 1.6, 0.4), new Vector3(-3, 3.2, 0), ORANGE);
    stem.physics!.body = new RigidBody();
    stem.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), 0.6);
    cast(kit, stem);
    const bar = box(stem, new Vector3(1.8, 0.4, 0.4), new Vector3(0, 0.9, 0), ORANGE);
    cast(kit, bar);

    // A dumbbell from one node: two sphere colliders moved off the origin with `offset`
    const bell = new Mesh(kit.scene, new BoxShape({ size: 1.6, sizeY: 0.16, sizeZ: 0.16 }), mat(BLUE));
    bell.position.setXYZ(2.5, 3.2, 0);
    bell.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), 0.5);
    const bar2 = new Collider();
    bar2.size = new Vector3(1.6, 0.16, 0.16);
    const left = new Collider();
    left.shape = 'sphere';
    left.radius = 0.4;
    left.offset = new Vector3(-0.8, 0, 0);
    const right = new Collider();
    right.shape = 'sphere';
    right.radius = 0.4;
    right.offset = new Vector3(0.8, 0, 0);
    bell.physics = new NodePhysics({ body: new RigidBody(), colliders: [bar2, left, right] });
    cast(kit, bell);
    for (const x of [-0.8, 0.8]) {
      const w = new Mesh(kit.scene, new SphereShape({ radius: 0.4 }), mat(YELLOW));
      w.parent = bell;
      w.position.setXYZ(x, 0, 0);
      cast(kit, w);
    }
    return [stem, bell]; // children go with their parents
  };
  respawn(kit, build, 6500, 'Drop again');

  orbit(kit, new Vector3(0, 3.5, 8), new Vector3(0, 1.2, 0));
  launch(kit);
});
