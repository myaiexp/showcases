// An IndexBuffer with setIndexBufferBinding(buffer, IndexFormat.UInt16)
import { Buffer, BufferBindFlag, BufferMesh, IndexFormat, MeshRenderer, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin } from '../../shared/gfx-kit.ts';
import { vertexColorMaterial } from '../../shared/gfx-buffer.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const SIDES = 6;
  const vertexCount = SIDES + 1;
  const vertices = new ArrayBuffer(vertexCount * 16);
  const floats = new Float32Array(vertices);
  const bytes = new Uint8Array(vertices);
  floats.set([0, 0, 0], 0);
  bytes.set([255, 255, 255, 255], 12);
  for (let i = 0; i < SIDES; i++) {
    const a = (i / SIDES) * Math.PI * 2;
    floats.set([Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0], (i + 1) * 4);
    bytes.set([128 + 127 * Math.cos((i / SIDES) * 6.283), 128 + 127 * Math.cos((i / SIDES + 0.33) * 6.283), 128 + 127 * Math.cos((i / SIDES + 0.67) * 6.283), 255], (i + 1) * 16 + 12);
  }
  const indices = new Uint16Array(SIDES * 3);
  for (let i = 0; i < SIDES; i++) indices.set([0, 1 + i, 1 + ((i + 1) % SIDES)], i * 3);
  const mesh = new BufferMesh(engine);
  const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);
  const indexBuffer = new Buffer(engine, BufferBindFlag.IndexBuffer, indices);
  mesh.setVertexBufferBinding(vertexBuffer, 16);
  mesh.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16);
  mesh.setVertexElements([new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0), new VertexElement('COLOR', 12, VertexElementFormat.NormalizedUByte4, 0)]);
  mesh.addSubMesh(0, indices.length);
  const entity = root.createChild('hexagon');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(vertexColorMaterial(engine));
  spin(entity, [0, 30, 0]);
  say(`${vertexCount} vertices + ${indices.length} UInt16 indices (${vertices.byteLength + indices.byteLength} bytes)`);
  stage.own(() => {
    mesh.destroy();
    vertexBuffer.destroy();
    indexBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
