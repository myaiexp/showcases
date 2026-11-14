// A mesh from your own VertexBuffer and IndexBuffer: float positions, bytes
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

interface Vertex {
  position: [number, number, number];
  color: [number, number, number, number];
}

/** Packs vertices into the interleaved layout the format describes. */
function pack(format: pc.VertexFormat, vertices: Vertex[]): ArrayBuffer {
  const data = new ArrayBuffer(format.size * vertices.length); // format.size is one vertex in bytes
  const floats = new Float32Array(data);
  const bytes = new Uint8Array(data);
  vertices.forEach((v, i) => {
    floats.set(v.position, (i * format.size) / 4);
    bytes.set(v.color, i * format.size + 12); // the colour follows 3 floats = 12 bytes
  });
  return data;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;

  // Position as 3 floats, colour as 4 normalised bytes: 16 bytes per vertex.
  const format = new pc.VertexFormat(device, [
    { semantic: pc.SEMANTIC_POSITION, components: 3, type: pc.TYPE_FLOAT32 },
    { semantic: pc.SEMANTIC_COLOR, components: 4, type: pc.TYPE_UINT8, normalize: true },
  ]);

  // 1. Unindexed: one triangle drawn straight from the vertex buffer.
  const triangle = [
    { position: [-1, 0, 0], color: [255, 0, 0, 255] },
    { position: [1, 0, 0], color: [0, 255, 0, 255] },
    { position: [0, 1.5, 0], color: [0, 0, 255, 255] },
  ] as Vertex[];
  const triMesh = new pc.Mesh(device);
  triMesh.vertexBuffer = new pc.VertexBuffer(device, format, triangle.length, { data: pack(format, triangle) });
  triMesh.primitive[0] = { type: pc.PRIMITIVE_TRIANGLES, base: 0, baseVertex: 0, count: triangle.length, indexed: false };
  // update() is not involved, so the bounding box is ours to set (centre, half extents).
  triMesh.aabb = new pc.BoundingBox(new pc.Vec3(0, 0.75, 0), new pc.Vec3(1, 0.75, 0.1));

  // 2. Indexed: a hexagon of six triangles sharing a hub vertex through an IndexBuffer.
  const hex: Vertex[] = [{ position: [0, 0, 0], color: [255, 255, 255, 255] }];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const c = pc.math.clamp(i * 50, 0, 255);
    hex.push({ position: [Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0], color: [255 - c, 120 + c / 3, c, 255] });
  }
  const indices = new Uint16Array(18);
  for (let i = 0; i < 6; i++) indices.set([0, 1 + i, 1 + ((i + 1) % 6)], i * 3);
  const hexMesh = new pc.Mesh(device);
  hexMesh.vertexBuffer = new pc.VertexBuffer(device, format, hex.length, { data: pack(format, hex) });
  hexMesh.indexBuffer[0] = new pc.IndexBuffer(device, pc.INDEXFORMAT_UINT16, indices.length, pc.BUFFER_STATIC, indices.buffer);
  hexMesh.primitive[0] = { type: pc.PRIMITIVE_TRIANGLES, base: 0, baseVertex: 0, count: indices.length, indexed: true };
  hexMesh.aabb = new pc.BoundingBox(new pc.Vec3(0, 0, 0), new pc.Vec3(1.3, 1.3, 0.1));

  // The vertex colours become the emission, so no light is needed.
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0, 0, 0);
  material.emissive = new pc.Color(1, 1, 1);
  material.emissiveVertexColor = true;
  material.useLighting = false;
  material.cull = pc.CULLFACE_NONE;
  material.update();

  const make = (mesh: pc.Mesh, x: number): pc.Entity => {
    const entity = new pc.Entity();
    entity.addComponent('render', { meshInstances: [new pc.MeshInstance(mesh, material)], castShadows: false });
    entity.setLocalPosition(x, 0, 0);
    app.root.addChild(entity);
    return entity;
  };
  const left = make(triMesh, -2.2);
  const right = make(hexMesh, 2.2);

  const camera = addCamera(app, { clearColor: new pc.Color(0.07, 0.08, 0.12) });
  camera.setPosition(0, 0.5, 8);

  let t = 0;
  let spin = true;
  app.on('update', (dt: number) => {
    t += dt;
    if (!spin) return;
    left.setLocalEulerAngles(0, t * 50, 0);
    right.setLocalEulerAngles(0, -t * 50, Math.sin(t) * 20);
  });
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('spin', true, (on) => (spin = on));
    panel.readout(`vertex size ${format.size} bytes: 12 for the position, 4 for the colour`);
  }

  return () => stage.dispose();
};

export default mount;
