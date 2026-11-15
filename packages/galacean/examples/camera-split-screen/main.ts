// Four cameras, four viewports: an engineering-style split screen
import { Camera, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, orbit, pbr, spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 9], hint: 'Each camera owns a quarter of the canvas through its viewport.' });
  const parts: [ReturnType<typeof PrimitiveMesh.createCuboid>, [number, number, number], [number, number, number]][] = [
    [PrimitiveMesh.createCuboid(engine, 1.4, 1, 1), [-1.4, -0.4, 0], [0.9, 0.4, 0.3]],
    [PrimitiveMesh.createSphere(engine, 0.8), [1.2, 0.2, 0.6], [0.35, 0.75, 0.5]],
    [PrimitiveMesh.createCone(engine, 0.7, 1.6), [0, 0.2, -1.3], [0.4, 0.55, 0.95]],
  ];
  for (const [mesh, pos, color] of parts) spin(add(root, mesh, pbr(engine, color, 0, 0.5), pos).entity, [0, 10, 0]);
  camera.viewport = new Vector4(0, 0.5, 0.5, 0.5);
  const views: { rect: Vector4; pos: [number, number, number]; up?: [number, number, number] }[] = [
    { rect: new Vector4(0.5, 0.5, 0.5, 0.5), pos: [9, 0, 0] },
    { rect: new Vector4(0, 0, 0.5, 0.5), pos: [0, 9, 0.001] },
    { rect: new Vector4(0.5, 0, 0.5, 0.5), pos: [6, 5, 6] },
  ];
  views.forEach((v, i) => {
    const e = root.createChild(`view ${i}`);
    e.transform.setPosition(...v.pos);
    e.transform.lookAt(camera.entity.transform.position.clone().set(0, 0, 0));
    const c = e.addComponent(Camera);
    c.viewport = v.rect;
    c.priority = i + 1;
    if (i === 2) orbit(e, [0, 0, 0], 8, 4, 0.5);
  });
  return stage.dispose;
};

export default mount;
