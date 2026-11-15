// BufferMesh with one interleaved vertex buffer: POSITION and COLOR per vertex
import { Buffer, BufferBindFlag, BufferMesh, MeshRenderer, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin } from '../../shared/gfx-kit.ts';
import { vertexColorMaterial } from '../../shared/gfx-buffer.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const SIDES = 6;
  const vertexCount = SIDES * 3;
  const vertices = new ArrayBuffer(vertexCount * 16);
  const floats = new Float32Array(vertices);
  const bytes = new Uint8Array(vertices);
  const ring = (i: number): [number, number] => [Math.cos((i / SIDES) * Math.PI * 2) * 1.8, Math.sin((i / SIDES) * Math.PI * 2) * 1.8];
  const tint = (i: number): number[] => [128 + 127 * Math.cos((i / SIDES) * 6.283), 128 + 127 * Math.cos((i / SIDES + 0.33) * 6.283), 128 + 127 * Math.cos((i / SIDES + 0.67) * 6.283), 255];
  let v = 0;
  const put = (x: number, y: number, c: number[]): void => {
    floats.set([x, y, 0], v * 4);
    bytes.set(c, v * 16 + 12);
    v++;
  };
  for (let i = 0; i < SIDES; i++) {
    put(0, 0, [255, 255, 255, 255]);
    put(...ring(i), tint(i));
    put(...ring((i + 1) % SIDES), tint(i + 1));
  }
  const mesh = new BufferMesh(engine);
  const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);
  mesh.setVertexBufferBinding(vertexBuffer, 16);
  mesh.setVertexElements([new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0), new VertexElement('COLOR', 12, VertexElementFormat.NormalizedUByte4, 0)]);
  mesh.addSubMesh(0, vertexCount);
  const entity = root.createChild('hexagon');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(vertexColorMaterial(engine));
  spin(entity, [0, 30, 0]);
  say(`1 buffer, stride 16, ${vertexCount} vertices, ${vertices.byteLength} bytes`);
  stage.own(() => {
    mesh.destroy();
    vertexBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
