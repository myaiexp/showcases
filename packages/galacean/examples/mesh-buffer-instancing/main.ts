// Instanced drawing: VertexElement instanceStepRate = 1 and BufferMesh.instanceCount
import { Buffer, BufferBindFlag, BufferMesh, BufferUsage, IndexFormat, MeshRenderer, VertexBufferBinding, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, orbit, tick } from '../../shared/gfx-kit.ts';
import { CUBE_CORNERS, CUBE_INDICES, instancedMaterial } from '../../shared/gfx-buffer.ts';
import { slider } from '../../shared/controls.ts';

const GRID = 12;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 9, 12], target: [0, 0, 0], light: false });
  const say = caption(stage);
  const vertices = new ArrayBuffer(8 * 16);
  const floats = new Float32Array(vertices);
  const bytes = new Uint8Array(vertices);
  for (let i = 0; i < 8; i++) {
    floats.set(CUBE_CORNERS.slice(i * 3, i * 3 + 3).map((c) => c * 0.22), i * 4);
    bytes.set([i & 1 ? 255 : 90, i & 2 ? 255 : 120, i & 4 ? 255 : 160, 255], i * 16 + 12);
  }
  const count = GRID * GRID;
  const instances = new Float32Array(count * 6);
  const mesh = new BufferMesh(engine);
  const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);
  const instanceBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, instances, BufferUsage.Dynamic);
  const indexBuffer = new Buffer(engine, BufferBindFlag.IndexBuffer, new Uint16Array(CUBE_INDICES));
  mesh.setVertexBufferBindings([new VertexBufferBinding(vertexBuffer, 16), new VertexBufferBinding(instanceBuffer, 24)]);
  mesh.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16);
  mesh.setVertexElements([
    new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0),
    new VertexElement('COLOR', 12, VertexElementFormat.NormalizedUByte4, 0),
    new VertexElement('INSTANCE_OFFSET', 0, VertexElementFormat.Vector3, 1, 1),
    new VertexElement('INSTANCE_ROTATION', 12, VertexElementFormat.Vector3, 1, 1),
  ]);
  mesh.addSubMesh(0, CUBE_INDICES.length);
  const entity = root.createChild('instances');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(instancedMaterial(engine));
  let n = count;
  mesh.instanceCount = n;
  tick(entity, (_dt, t) => {
    for (let i = 0; i < count; i++) {
      const x = (i % GRID) - GRID / 2 + 0.5;
      const z = Math.floor(i / GRID) - GRID / 2 + 0.5;
      instances.set([x * 1.1, Math.sin(t * 1.5 + x * 0.6 + z * 0.6) * 0.8, z * 1.1, t + x * 0.2, t * 0.7 + z * 0.2, 0], i * 6);
    }
    instanceBuffer.setData(instances);
    say(`instanceCount = ${n} (one draw call)`);
  });
  orbit(camera.entity, [0, 0, 0], 12, 9, 0.2);
  if (!stage.preview) slider(stage.bar, 'instanceCount', 1, count, 1, count, (v) => (mesh.instanceCount = n = v));
  stage.own(() => {
    mesh.destroy();
    vertexBuffer.destroy();
    instanceBuffer.destroy();
    indexBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
