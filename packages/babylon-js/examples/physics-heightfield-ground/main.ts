// PhysicsShapeHeightField ground with rolling balls
import { MeshBuilder, PhysicsBody, PhysicsMotionType, PhysicsShapeHeightField, PhysicsShapeSphere, VertexBuffer, VertexData, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPhysicsStage, paint } from '../../shared/physicsStage.ts';

const SIZE = 30;
const SUBDIVISIONS = 30;

const mount: Mount = async (el, ctx) => {
  const ps = await createPhysicsStage(el, ctx, { camera: { radius: 42, beta: 1.0 } });
  const { scene } = ps;

  // Heights live in a Float32Array of (subdivisions + 1)^2 samples, row z then column x, where
  // row 0 is the +z edge: the same order MeshBuilder.CreateGround lays out its vertices in.
  const n = SUBDIVISIONS + 1;
  const heights = new Float32Array(n * n);
  const step = SIZE / SUBDIVISIONS;
  const half = SIZE / 2;
  for (let z = 0; z < n; z++) {
    for (let x = 0; x < n; x++) {
      const xc = x * step - half;
      const zc = -(z * step - half);
      heights[z * n + x] = 1.6 * Math.sin(xc * 0.35) * Math.cos(zc * 0.3) + 0.8 * Math.sin((xc + zc) * 0.7);
    }
  }

  // The render mesh takes the same heights.
  const ground = MeshBuilder.CreateGround('ground', { width: SIZE, height: SIZE, subdivisions: SUBDIVISIONS, updatable: true }, scene);
  const positions = ground.getVerticesData(VertexBuffer.PositionKind)!;
  for (let i = 0; i < heights.length; i++) positions[i * 3 + 1] = heights[i]!;
  ground.updateVerticesData(VertexBuffer.PositionKind, positions);
  const normals: number[] = [];
  const indices = ground.getIndices()!;
  VertexData.ComputeNormals(positions, indices, normals);
  ground.updateVerticesData(VertexBuffer.NormalKind, normals);
  paint(ground, '#4a8f6a');

  const shape = new PhysicsShapeHeightField(SIZE, SIZE, n, n, heights, scene);
  const groundBody = new PhysicsBody(ground, PhysicsMotionType.STATIC, false, scene);
  groundBody.shape = shape;
  shape.material = { friction: 0.5, restitution: 0.2 };

  const ballShape = new PhysicsShapeSphere(Vector3.Zero(), 0.7, scene);
  const balls: Mesh[] = [];
  const colors = ['#f7768e', '#e0af68', '#7dcfff', '#bb9af7'];
  let count = 0;
  const spawn = (): void => {
    const ball = MeshBuilder.CreateSphere('ball', { diameter: 1.4, segments: 12 }, scene);
    ball.position.set((Math.random() - 0.5) * 22, 9, (Math.random() - 0.5) * 22);
    paint(ball, colors[count++ % colors.length]!);
    const body = new PhysicsBody(ball, PhysicsMotionType.DYNAMIC, false, scene);
    body.shape = ballShape;
    body.setMassProperties({ mass: 1 });
    balls.push(ball);
    if (balls.length > (ctx.preview ? 8 : 16)) balls.shift()!.dispose();
  };
  const timer = setInterval(spawn, 700);
  ps.onDispose(() => clearInterval(timer));

  ps.stage.run(() => {
    ps.camera.alpha += 0.002;
  });
  return () => ps.dispose();
};

export default mount;
