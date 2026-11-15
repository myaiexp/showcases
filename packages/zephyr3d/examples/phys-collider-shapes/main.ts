// Collider shapes: box, sphere, capsule and cylinder dropping onto a floor
import { Quaternion, Vector3 } from '@zephyr3d/base';
import { BoxShape, Collider, Mesh, NodePhysics, RigidBody, SphereShape } from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, capsuleShape, cast, cylinderShape, floor, GREEN, launch, mat, orbit, ORANGE, respawn, startPhysics, YELLOW } from '../../shared/phys-kit.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage);
  floor(kit);
  stage.caption('box · sphere · capsule · cylinder');

  // Each body is a mesh plus a RigidBody and one Collider; `shape` picks the
  // collider and the matching size fields say how big it is.
  const body = (mesh: Mesh, collider: Collider, x: number, tilt: number): Mesh => {
    mesh.position.setXYZ(x, 3.5, 0);
    mesh.rotation = Quaternion.fromAxisAngle(new Vector3(1, 0, 1).inplaceNormalize(), tilt);
    mesh.physics = new NodePhysics({ body: new RigidBody(), colliders: [collider] });
    cast(kit, mesh);
    return mesh;
  };
  const build = (): Mesh[] => {
    const box = new Collider(); // 'box': size
    box.shape = 'box';
    box.size = new Vector3(1, 0.8, 1.2);
    const sphere = new Collider(); // 'sphere': radius
    sphere.shape = 'sphere';
    sphere.radius = 0.55;
    const capsule = new Collider(); // 'capsule': radius and total height, round ends included
    capsule.shape = 'capsule';
    capsule.radius = 0.4;
    capsule.height = 1.6;
    const cylinder = new Collider(); // 'cylinder': radius and height
    cylinder.shape = 'cylinder';
    cylinder.radius = 0.5;
    cylinder.height = 1;
    return [
      body(new Mesh(kit.scene, new BoxShape({ size: 1, sizeY: 0.8, sizeZ: 1.2 }), mat(ORANGE)), box, -3.6, 0.5),
      body(new Mesh(kit.scene, new SphereShape({ radius: 0.55 }), mat(BLUE)), sphere, -1.2, 0),
      body(new Mesh(kit.scene, capsuleShape(0.4, 1.6), mat(GREEN)), capsule, 1.2, 0.9),
      body(new Mesh(kit.scene, cylinderShape(0.5, 1), mat(YELLOW)), cylinder, 3.6, 0.7),
    ];
  };
  respawn(kit, build, 6000, 'Drop again');

  orbit(kit, new Vector3(0, 3.5, 9), new Vector3(0, 0.8, 0));
  launch(kit);
});
