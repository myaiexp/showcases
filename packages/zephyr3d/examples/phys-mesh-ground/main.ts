// Mesh collider: balls roll over rolling ground built from triangles
import { BoundingBox, Mesh, NodePhysics, Primitive, Collider } from '@zephyr3d/scene';
import { Vector3 } from '@zephyr3d/base';
import { zephyrExample } from '../../shared/frame.ts';
import { BLUE, dynBall, GREEN, launch, mat, orbit, ORANGE, respawn, startPhysics, YELLOW, cast } from '../../shared/phys-kit.ts';

/** Rolling ground, 16 m square: y = 0.6 sin(0.5 x) cos(0.4 z). */
function rollingGround(): Primitive {
  const n = 40;
  const size = 16;
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  for (let j = 0; j <= n; j++) {
    for (let i = 0; i <= n; i++) {
      const x = (i / n - 0.5) * size;
      const z = (j / n - 0.5) * size;
      positions.push(x, 0.6 * Math.sin(0.5 * x) * Math.cos(0.4 * z), z);
      const dx = 0.3 * Math.cos(0.5 * x) * Math.cos(0.4 * z);
      const dz = -0.24 * Math.sin(0.5 * x) * Math.sin(0.4 * z);
      const len = Math.hypot(dx, 1, dz);
      normals.push(-dx / len, 1 / len, -dz / len);
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const a = j * (n + 1) + i;
      indices.push(a, a + n + 1, a + 1, a + 1, a + n + 1, a + n + 2);
    }
  }
  const prim = new Primitive();
  prim.createAndSetVertexBuffer('position_f32x3', new Float32Array(positions));
  prim.createAndSetVertexBuffer('normal_f32x3', new Float32Array(normals));
  prim.createAndSetIndexBuffer(new Uint16Array(indices));
  // Hand-built primitives need a bounding volume
  prim.setBoundingVolume(new BoundingBox(new Vector3(-size / 2, -0.6, -size / 2), new Vector3(size / 2, 0.6, size / 2)));
  prim.indexCount = indices.length;
  return prim;
}

export default zephyrExample(import.meta.url, async (stage) => {
  const kit = await startPhysics(stage, { half: 8 });
  stage.caption('shape = \'mesh\': the node\'s own triangles');

  // A mesh collider uses the mesh's triangles as they are: for static ground only
  const ground = new Mesh(kit.scene, rollingGround(), mat([0.45, 0.55, 0.4]));
  ground.castShadow = false;
  const groundCollider = new Collider();
  groundCollider.shape = 'mesh';
  ground.physics = new NodePhysics({ colliders: [groundCollider] });
  cast(kit, ground);

  const readout = stage.readout();
  // The world waits for mesh colliders to be read back from the GPU; `ready` flips when this one is in
  kit.myApp.on('tick', () => {
    if (readout) readout.textContent = `mesh collider ready: ${groundCollider.ready}${groundCollider.error ? ' (' + groundCollider.error + ')' : ''}`;
  });

  const colors = [ORANGE, BLUE, YELLOW, GREEN];
  respawn(
    kit,
    () =>
      colors.flatMap((c, i) => [
        dynBall(kit, 0.3, new Vector3(-6 + i * 0.5, 4 + i * 0.4, -3 + i * 1.8), c, 1),
        dynBall(kit, 0.3, new Vector3(-5.2 + i * 0.5, 5.5, -2 + i * 1.8), c, 1),
      ]),
    9000,
    'Roll again',
  );

  orbit(kit, new Vector3(0, 7, 11), new Vector3(0, 0, 0));
  launch(kit);
});
