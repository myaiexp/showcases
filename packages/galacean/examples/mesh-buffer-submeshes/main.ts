// Two SubMeshes in a BufferMesh, each drawn with a different material
import { Buffer, BufferBindFlag, BufferMesh, IndexFormat, MeshRenderer, MeshTopology, UnlitMaterial, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin } from '../../shared/gfx-kit.ts';
import { vertexColorMaterial } from '../../shared/gfx-buffer.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  const SIDES = 6;
  const vertices = new ArrayBuffer((SIDES + 1) * 16);
  const floats = new Float32Array(vertices);
  const bytes = new Uint8Array(vertices);
  bytes.set([255, 255, 255, 255], 12);
  for (let i = 0; i < SIDES; i++) {
    const a = (i / SIDES) * Math.PI * 2;
    floats.set([Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0], (i + 1) * 4);
    bytes.set([60 + 30 * i, 120, 255 - 30 * i, 255], (i + 1) * 16 + 12);
  }
  const indices = new Uint16Array(SIDES * 3 + SIDES);
  for (let i = 0; i < SIDES; i++) {
    indices.set([0, 1 + i, 1 + ((i + 1) % SIDES)], i * 3);
    indices[SIDES * 3 + i] = 1 + i;
  }
  const mesh = new BufferMesh(engine);
  const vertexBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, vertices);
  const indexBuffer = new Buffer(engine, BufferBindFlag.IndexBuffer, indices);
  mesh.setVertexBufferBinding(vertexBuffer, 16);
  mesh.setIndexBufferBinding(indexBuffer, IndexFormat.UInt16);
  mesh.setVertexElements([new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0), new VertexElement('COLOR', 12, VertexElementFormat.NormalizedUByte4, 0)]);
  mesh.addSubMesh(0, SIDES * 3, MeshTopology.Triangles);
  mesh.addSubMesh(SIDES * 3, SIDES, MeshTopology.LineLoop);
  const outline = new UnlitMaterial(engine);
  outline.baseColor.set(1, 1, 1, 1);
  const entity = root.createChild('hexagon');
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(0, vertexColorMaterial(engine));
  renderer.setMaterial(1, outline);
  spin(entity, [0, 30, 0]);
  say(`sub-mesh 0: Triangles x ${SIDES}, sub-mesh 1: LineLoop, materials ${renderer.materialCount}`);
  stage.own(() => {
    mesh.destroy();
    vertexBuffer.destroy();
    indexBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
