// screenToWorldPoint: the input's z is the distance from the camera
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, pbr, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 3, 9], target: [0, 0, 0], hint: 'Move the pointer over the canvas.' });
  const say = caption(stage);
  floor(root, engine, -1);
  for (const x of [-4, -2, 0, 2, 4]) add(root, PrimitiveMesh.createCuboid(engine, 0.6, 0.6, 0.6), pbr(engine, [0.4, 0.55, 0.9], 0, 0.5), [x, -0.7, -2]);
  const marker = add(root, PrimitiveMesh.createSphere(engine, 0.3), pbr(engine, [0.95, 0.5, 0.25], 0, 0.3)).entity;
  const point = new Vector3();
  const world = new Vector3();
  let depth = 9;
  let pointer: [number, number] | null = null;
  const canvas = stage.canvas;
  const onMove = (e: PointerEvent): void => {
    const r = canvas.getBoundingClientRect();
    pointer = [((e.clientX - r.left) * canvas.width) / r.width, ((e.clientY - r.top) * canvas.height) / r.height];
  };
  if (!stage.preview) {
    canvas.addEventListener('pointermove', onMove);
    stage.own(() => canvas.removeEventListener('pointermove', onMove));
    slider(stage.bar, 'distance (z)', 2, 16, 0.1, depth, (v) => (depth = v));
  }
  tick(marker, (_dt, t) => {
    const xy = pointer ?? [canvas.width * (0.5 + 0.35 * Math.sin(t * 0.8)), canvas.height * (0.5 + 0.3 * Math.sin(t * 1.3))];
    if (stage.preview) depth = 9 + 3 * Math.sin(t * 0.5);
    point.set(xy[0]!, xy[1]!, depth);
    camera.screenToWorldPoint(point, world);
    marker.transform.worldPosition = world;
    say(`world (${world.x.toFixed(1)}, ${world.y.toFixed(1)}, ${world.z.toFixed(1)}) at distance ${depth.toFixed(1)}`);
  });
  return stage.dispose;
};

export default mount;
