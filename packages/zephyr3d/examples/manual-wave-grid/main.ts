// A hand-built grid mesh whose vertex data is rewritten every frame, with its bounding volume refreshed
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, BoundingBox, DirectionalLight, LambertMaterial, Mesh, Primitive, Scene } from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/light-world.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 1.2, 0.6), Vector3.zero(), Vector3.axisPY());

  const N = stage.preview ? 24 : 48; // vertices per side
  const SIZE = 10;
  const positions = new Float32Array(N * N * 3);
  const normals = new Float32Array(N * N * 3);
  const colors = new Uint8Array(N * N * 4);
  const indexData = new Uint16Array((N - 1) * (N - 1) * 6);
  let k = 0;
  for (let j = 0; j < N - 1; j++) {
    for (let i = 0; i < N - 1; i++) {
      const a = j * N + i;
      // Counter-clockwise seen from +Y, so the top face is the front face
      indexData.set([a, a + N, a + 1, a + 1, a + N, a + N + 1], k);
      k += 6;
    }
  }
  const primitive = new Primitive();
  // dynamic buffers can be rewritten with bufferSubData
  const posBuf = primitive.createAndSetVertexBuffer('position_f32x3', positions, undefined, { dynamic: true });
  const nrmBuf = primitive.createAndSetVertexBuffer('normal_f32x3', normals, undefined, { dynamic: true });
  const colBuf = primitive.createAndSetVertexBuffer('diffuse_u8normx4', colors, undefined, { dynamic: true });
  primitive.createAndSetIndexBuffer(indexData);

  const material = new LambertMaterial();
  material.vertexColor = true;
  const mesh = new Mesh(scene, primitive, material);

  let amplitude = 1.2;
  const fill = (t: number): void => {
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        const o = j * N + i;
        const x = (i / (N - 1) - 0.5) * SIZE;
        const z = (j / (N - 1) - 0.5) * SIZE;
        const h = Math.sin(x * 1.1 + t) * Math.cos(z * 0.9 - t * 0.8);
        // The height is amplitude * h, so its slope has the closed form below
        const dx = amplitude * 1.1 * Math.cos(x * 1.1 + t) * Math.cos(z * 0.9 - t * 0.8);
        const dz = -amplitude * 0.9 * Math.sin(x * 1.1 + t) * Math.sin(z * 0.9 - t * 0.8);
        positions.set([x, amplitude * h, z], o * 3);
        const len = Math.hypot(dx, 1, dz);
        normals.set([-dx / len, 1 / len, -dz / len], o * 3);
        const u = h * 0.5 + 0.5;
        colors.set([40 + 200 * u, 120 + 80 * (1 - Math.abs(u - 0.5) * 2), 230 - 180 * u, 255], o * 4);
      }
    }
    posBuf.bufferSubData(0, positions);
    nrmBuf.bufferSubData(0, normals);
    colBuf.bufferSubData(0, colors);
  };
  // Hand-made primitives carry no bounds: give it the box the waves can reach, and say so again
  // (invalidateBoundingVolume) when a change of amplitude moves that box.
  const setBounds = (): void => {
    primitive.setBoundingVolume(new BoundingBox(new Vector3(-SIZE / 2, -amplitude, -SIZE / 2), new Vector3(SIZE / 2, amplitude, SIZE / 2)));
    mesh.invalidateBoundingVolume();
  };
  fill(0);
  setBounds();
  orbitCamera(scene, new Vector3(0, 9, 12), 100);

  myApp.on('tick', (_dt, ms) => fill(ms * 0.0015));
  if (stage.bar) {
    slider(stage.bar, 'amplitude', [0, 3, 0.1], amplitude, (v) => {
      amplitude = v;
      setBounds();
    });
  } else {
    stage.caption('position, normal and diffuse buffers rewritten each frame');
  }
  myApp.run();
});
