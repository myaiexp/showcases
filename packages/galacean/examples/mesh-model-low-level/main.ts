// Low-level data on a ModelMesh: Buffer + setVertexBufferBinding + setVertexElements
import { RenderFace, Buffer, BufferBindFlag, BufferUsage, MeshRenderer, MeshTopology, ModelMesh, UnlitMaterial, VertexAttribute, VertexElement, VertexElementFormat } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 4], light: false });
  const say = caption(stage);
  const pos = new Float32Array([1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]);
  const posBuffer = new Buffer(engine, BufferBindFlag.VertexBuffer, pos, BufferUsage.Static, true);
  const mesh = new ModelMesh(engine);
  mesh.setVertexBufferBinding(posBuffer, 12, 0);
  mesh.setVertexElements([new VertexElement(VertexAttribute.Position, 0, VertexElementFormat.Vector3, 0)]);
  mesh.addSubMesh(0, 4, MeshTopology.TriangleStrip);
  mesh.uploadData(false);
  const result = mesh.getPositions();
  say(`getPositions(): ${result?.map((p) => `(${p.x}, ${p.y}, ${p.z})`).join(' ')}`);
  const entity = root.createChild('low-level');
  entity.transform.setPosition(-0.6, -0.5, 0);
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  const material = new UnlitMaterial(engine);
  material.baseColor.set(0.4, 0.8, 0.6, 1);
  material.renderFace = RenderFace.Double;
  renderer.setMaterial(material);
  spin(entity, [0, 30, 0]);
  stage.own(() => {
    mesh.destroy();
    posBuffer.destroy();
  });
  return stage.dispose;
};

export default mount;
