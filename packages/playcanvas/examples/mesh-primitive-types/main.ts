// mesh.update(type): one ring of vertices drawn as points, lines, strips, loops, fans and triangles
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const N = 10;
const ring = (r: number, i: number): [number, number, number] => [Math.cos((i / N) * Math.PI * 2) * r, Math.sin((i / N) * Math.PI * 2) * r, 0];

interface Shape {
  name: string;
  type: number;
  positions: number[];
  indices?: number[];
}

function shapes(): Shape[] {
  const outer = Array.from({ length: N }, (_, i) => ring(1, i));
  const inner = Array.from({ length: N }, (_, i) => ring(0.5, i));
  return [
    { name: 'PRIMITIVE_POINTS', type: pc.PRIMITIVE_POINTS, positions: [...outer.flat(), ...inner.flat()] },
    { name: 'PRIMITIVE_LINES', type: pc.PRIMITIVE_LINES, positions: outer.flatMap((p, i) => [...inner[i]!, ...p]) },
    { name: 'PRIMITIVE_LINESTRIP', type: pc.PRIMITIVE_LINESTRIP, positions: outer.flat() },
    { name: 'PRIMITIVE_LINELOOP', type: pc.PRIMITIVE_LINELOOP, positions: outer.flat() },
    // A band between two rings: the strip alternates outer, inner, outer, inner ...
    { name: 'PRIMITIVE_TRISTRIP', type: pc.PRIMITIVE_TRISTRIP, positions: [...outer, ...inner].flat(), indices: Array.from({ length: N + 1 }, (_, i) => [i % N, N + (i % N)]).flat() },
    // A fan: the first vertex is the hub, the rest sweep around it.
    { name: 'PRIMITIVE_TRIFAN', type: pc.PRIMITIVE_TRIFAN, positions: [0, 0, 0, ...outer.flat()], indices: [0, ...Array.from({ length: N + 1 }, (_, i) => 1 + (i % N))] },
    // Every three indices are one triangle: five separate spikes.
    { name: 'PRIMITIVE_TRIANGLES', type: pc.PRIMITIVE_TRIANGLES, positions: [...outer, ...inner].flat(), indices: Array.from({ length: N / 2 }, (_, k) => [2 * k, N + 2 * k, (2 * k + 1) % N]).flat() },
  ];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;

  const defs = shapes();
  const entities = defs.map((def, i) => {
    const mesh = new pc.Mesh(device);
    mesh.setPositions(new Float32Array(def.positions));
    if (def.indices) mesh.setIndices(def.indices);
    mesh.update(def.type);

    // No normals and no lights: the material just shows a colour.
    const material = new pc.StandardMaterial();
    material.diffuse = new pc.Color(0, 0, 0);
    material.emissive = new pc.Color().fromString(['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#f472b6', '#9ae6ff'][i]!);
    material.useLighting = false;
    material.cull = pc.CULLFACE_NONE;
    material.update();

    const entity = new pc.Entity(def.name);
    entity.addComponent('render', { meshInstances: [new pc.MeshInstance(mesh, material)], castShadows: false });
    const col = i < 4 ? i : i - 4;
    entity.setLocalPosition((col - 1.5) * 2.6, i < 4 ? 1.3 : -1.3, 0);
    entity.setLocalScale(1.1, 1.1, 1.1);
    app.root.addChild(entity);
    return entity;
  });

  const camera = addCamera(app, { fov: 45 });
  camera.setPosition(0, 0, 11);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    entities.forEach((e, i) => e.setLocalEulerAngles(Math.sin(t * 0.6 + i) * 25, t * 35, 0));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('top row: POINTS, LINES, LINESTRIP, LINELOOP. Bottom row: TRISTRIP, TRIFAN, TRIANGLES.');
    panel.row();
    panel.readout('Points and lines are one pixel wide.');
  }

  return () => stage.dispose();
};

export default mount;
