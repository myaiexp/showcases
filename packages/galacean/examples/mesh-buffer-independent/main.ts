// Separate vertex buffers: static POSITION, dynamic COLOR updated through Buffer.setData
import { Buffer, BufferBindFlag, BufferMesh, BufferUsage, MeshRenderer, VertexBufferBinding, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin, tick } from '../../shared/gfx-kit.ts';
import { vertexColorMaterial } from '../../shared/gfx-buffer.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const SIDES = 8;
  const count = SIDES * 3;
  const positions = new Float32Array(count * 3);
  const colors = new Uint8Array(count * 4);
  for (let i = 0; i < SIDES; i++) {
    const a = (i / SIDES) * Math.PI * 2;
    const b = ((i + 1) / SIDES) * Math.PI * 2;
    positions.set([0, 0, 0, Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0, Math.cos(b) * 1.8, Math.sin(b) * 1.8, 0], i * 9);
  }
  const mesh = new BufferMesh(engine);
  const positionBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, positions);
  const colorBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, colors, BufferUsage.Dynamic);
  mesh.setVertexBufferBindings([new VertexBufferBinding(positionBuffer, 12), new VertexBufferBinding(colorBuffer, 4)]);
  mesh.setVertexElements([new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0), new VertexElement('COLOR', 0, VertexElementFormat.NormalizedUByte4, 1)]);
  mesh.addSubMesh(0, count);
  const entity = root.createChild('disc');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(vertexColorMaterial(engine));
  spin(entity, [0, 25, 0]);
  tick(entity, (_dt, t) => {
    for (let v = 0; v < count; v++) {
      const phase = (v % 3 === 0 ? 0 : Math.floor(v / 3) + (v % 3)) / SIDES;
      colors.set([128 + 127 * Math.sin(t * 2 + phase * 6.283), 128 + 127 * Math.sin(t * 1.3 + phase * 6.283 + 2), 128 + 127 * Math.sin(t * 0.9 + phase * 6.283 + 4), 255], v * 4);
    }
    colorBuffer.setData(colors);
    say('colorBuffer.setData(colors) each frame; positions never re-sent');
  });
  stage.own(() => {
    mesh.destroy();
    positionBuffer.destroy();
    colorBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
